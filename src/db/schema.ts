import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

/* ------------------------------------------------------------------ */
/* Authentification (Better Auth) — comptes du back-office             */
/* ------------------------------------------------------------------ */

export const userRole = pgEnum('user_role', ['admin', 'agent', 'editor'])

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  role: userRole('role').notNull().default('agent'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

/* ------------------------------------------------------------------ */
/* Catalogue des services consulaires                                  */
/* ------------------------------------------------------------------ */

export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: text('code').notNull().unique(), // ex. "01" — sert au n° de dossier
  slug: text('slug').notNull().unique(),
  titleFr: text('title_fr').notNull(),
  titleEn: text('title_en').notNull(),
  descriptionFr: text('description_fr'),
  descriptionEn: text('description_en'),
  priceAmount: integer('price_amount'), // en unité de la devise ; null = sur devis
  currency: text('currency').notNull().default('XAF'),
  processingDays: integer('processing_days'),
  requiresInPerson: boolean('requires_in_person').notNull().default(false),
  featured: boolean('featured').notNull().default(false),
  active: boolean('active').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Pièces à fournir pour un service : génère le formulaire dynamiquement.
export const serviceDocuments = pgTable(
  'service_documents',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    serviceId: uuid('service_id')
      .notNull()
      .references(() => services.id, { onDelete: 'cascade' }),
    labelFr: text('label_fr').notNull(),
    labelEn: text('label_en').notNull(),
    required: boolean('required').notNull().default(true),
    sortOrder: integer('sort_order').notNull().default(0),
  },
  (t) => [index('service_documents_service_idx').on(t.serviceId)],
)

/* ------------------------------------------------------------------ */
/* Demandes, pièces jointes, historique, paiements                     */
/* ------------------------------------------------------------------ */

export const applicationStatus = pgEnum('application_status', [
  'submitted', // reçue
  'awaiting_payment', // en attente de paiement
  'in_review', // en cours d'examen
  'info_requested', // pièces complémentaires demandées
  'approved', // acceptée
  'ready', // prête à retirer
  'completed', // terminée
  'rejected', // refusée
])

export const applications = pgTable(
  'applications',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    reference: text('reference').notNull().unique(), // ex. CBC-01-482913
    serviceId: uuid('service_id')
      .notNull()
      .references(() => services.id),
    status: applicationStatus('status').notNull().default('submitted'),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email').notNull(),
    phone: text('phone').notNull(),
    address: text('address'),
    locale: text('locale').notNull().default('fr'),
    assignedTo: text('assigned_to').references(() => user.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (t) => [
    index('applications_status_idx').on(t.status),
    index('applications_email_idx').on(t.email),
  ],
)

export const applicationFiles = pgTable('application_files', {
  id: uuid('id').primaryKey().defaultRandom(),
  applicationId: uuid('application_id')
    .notNull()
    .references(() => applications.id, { onDelete: 'cascade' }),
  documentId: uuid('document_id').references(() => serviceDocuments.id),
  storageKey: text('storage_key').notNull(),
  fileName: text('file_name').notNull(),
  mimeType: text('mime_type').notNull(),
  sizeBytes: integer('size_bytes').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Historique des changements de statut (affiché dans le suivi).
export const applicationEvents = pgTable('application_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  applicationId: uuid('application_id')
    .notNull()
    .references(() => applications.id, { onDelete: 'cascade' }),
  status: applicationStatus('status').notNull(),
  note: text('note'),
  publicNote: boolean('public_note').notNull().default(false),
  createdBy: text('created_by').references(() => user.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const paymentStatus = pgEnum('payment_status', [
  'pending',
  'paid',
  'failed',
  'refunded',
])

export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  applicationId: uuid('application_id')
    .notNull()
    .references(() => applications.id, { onDelete: 'cascade' }),
  provider: text('provider').notNull(), // ex. mtn_momo, airtel_money, card
  providerRef: text('provider_ref'),
  amount: integer('amount').notNull(),
  currency: text('currency').notNull().default('XAF'),
  status: paymentStatus('status').notNull().default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  paidAt: timestamp('paid_at'),
})

/* ------------------------------------------------------------------ */
/* Rendez-vous                                                         */
/* ------------------------------------------------------------------ */

export const appointmentSlots = pgTable(
  'appointment_slots',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    startsAt: timestamp('starts_at').notNull(),
    endsAt: timestamp('ends_at').notNull(),
    capacity: integer('capacity').notNull().default(1),
    active: boolean('active').notNull().default(true),
  },
  (t) => [index('appointment_slots_starts_idx').on(t.startsAt)],
)

export const appointmentStatus = pgEnum('appointment_status', [
  'booked',
  'cancelled',
  'attended',
  'no_show',
])

export const appointments = pgTable('appointments', {
  id: uuid('id').primaryKey().defaultRandom(),
  reference: text('reference').notNull().unique(),
  slotId: uuid('slot_id')
    .notNull()
    .references(() => appointmentSlots.id),
  serviceId: uuid('service_id').references(() => services.id),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  status: appointmentStatus('status').notNull().default('booked'),
  locale: text('locale').notNull().default('fr'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

/* ------------------------------------------------------------------ */
/* Contenu : actualités et communiqués                                 */
/* ------------------------------------------------------------------ */

export const news = pgTable('news', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  titleFr: text('title_fr').notNull(),
  titleEn: text('title_en'),
  excerptFr: text('excerpt_fr'),
  excerptEn: text('excerpt_en'),
  bodyFr: text('body_fr'),
  bodyEn: text('body_en'),
  coverUrl: text('cover_url'),
  pdfUrl: text('pdf_url'),
  isCommunique: boolean('is_communique').notNull().default(false),
  published: boolean('published').notNull().default(false),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

/* ------------------------------------------------------------------ */
/* Formulaire de contact                                               */
/* ------------------------------------------------------------------ */

export const contactMessages = pgTable('contact_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  consulate: text('consulate').notNull(),
  topic: text('topic').notNull(),
  message: text('message').notNull(),
  locale: text('locale').notNull().default('fr'),
  ipHash: text('ip_hash'), // empreinte (jamais l'IP brute), pour repérer les abus
  emailedAt: timestamp('emailed_at'), // renseigné si la notification e-mail est partie
  handled: boolean('handled').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

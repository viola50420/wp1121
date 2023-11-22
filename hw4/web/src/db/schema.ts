import { relations } from "drizzle-orm";
import {
  index,
  text,
  pgTable,
  serial,
  uuid,
  varchar,
  unique,
} from "drizzle-orm/pg-core";

// Checkout the many-to-many relationship in the following tutorial:
// https://orm.drizzle.team/docs/rqb#many-to-many

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 100 }),
    email: varchar("email", { length: 100 }).notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    emailIndex: index("email_index").on(table.email),
  }),
);

export const usersRelations = relations(usersTable, ({ many }) => ({
  usersToDocumentsTable: many(usersToDocumentsTable),
}));

export const documentsTable = pgTable(
  "documents",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    title: varchar("title", { length: 100 }).notNull(),
    content: text("content").notNull(),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const documentsRelations = relations(documentsTable, ({ many }) => ({
  usersToDocumentsTable: many(usersToDocumentsTable),
}));

export const usersToDocumentsTable = pgTable(
  "users_to_documents",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    documentId: uuid("document_id")
      .notNull()
      .references(() => documentsTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    userAndDocumentIndex: index("user_and_document_index").on(
      table.userId,
      table.documentId,
    ),
    // This is a unique constraint on the combination of userId and documentId.
    // This ensures that there is no duplicate entry in the table.
    uniqCombination: unique().on(table.documentId, table.userId),
  }),
);
export const messagesTable = pgTable(
  "messages",
  {
    id: serial("id").primaryKey(),
    content: text("message").notNull(), // 修正此處的名稱
    documentId: uuid("document_id")
      .notNull()
      .references(() => documentsTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    sender: varchar("sender", { length: 100 }).notNull(), // 新增 sender 欄位
  },
  (table) => ({
    documentIndex: index("document_index").on(table.documentId),
  }),
);
export const usersToDocumentsRelations = relations(
  usersToDocumentsTable,
  ({ one }) => ({
    document: one(documentsTable, {
      fields: [usersToDocumentsTable.documentId],
      references: [documentsTable.displayId],
    }),
    user: one(usersTable, {
      fields: [usersToDocumentsTable.userId],
      references: [usersTable.displayId],
    }),
  }),
);

export const messagesToDocumentsTable = pgTable(
  "messages_to_documents",
  {
    id: serial("id").primaryKey(),
    messageId: uuid("message_id")
      .notNull()
      .references(() => messagesTable.id, {
        // 將 displayId 改為 id
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    documentId: uuid("document_id")
      .notNull()
      .references(() => documentsTable.id, {
        // 將 displayId 改為 id
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    messageAndDocumentIndex: index("message_and_document_index").on(
      table.messageId,
      table.documentId,
    ),
    uniqCombination: unique().on(table.messageId, table.documentId),
  }),
);

// 關聯
export const messagesToDocumentsRelations = relations(
  messagesToDocumentsTable,
  ({ one }) => ({
    message: one(messagesTable, {
      fields: [messagesToDocumentsTable.messageId],
      references: [messagesTable.id], // 將 displayId 改為 id
    }),
    document: one(documentsTable, {
      fields: [messagesToDocumentsTable.documentId],
      references: [documentsTable.id], // 將 displayId 改為 id
    }),
  }),
);

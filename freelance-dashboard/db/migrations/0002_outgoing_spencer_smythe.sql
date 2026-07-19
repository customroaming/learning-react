PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_invoice_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`invoice_id` integer NOT NULL,
	`type` text NOT NULL,
	`description` text NOT NULL,
	`quantity` real DEFAULT 1 NOT NULL,
	`unit_price` real NOT NULL,
	`amount` real NOT NULL,
	FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_invoice_items`("id", "invoice_id", "type", "description", "quantity", "unit_price", "amount") SELECT "id", "invoice_id", "type", "description", "quantity", "unit_price", "amount" FROM `invoice_items`;--> statement-breakpoint
DROP TABLE `invoice_items`;--> statement-breakpoint
ALTER TABLE `__new_invoice_items` RENAME TO `invoice_items`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
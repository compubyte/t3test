/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 't3test_session'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "t3test_session" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "t3test_session" ADD CONSTRAINT "t3test_session_session_token_unique" UNIQUE("session_token");
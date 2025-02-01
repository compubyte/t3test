ALTER TABLE "t3test_session" DROP CONSTRAINT "t3test_session_session_token_unique";--> statement-breakpoint
ALTER TABLE "t3test_session" ADD PRIMARY KEY ("session_token");--> statement-breakpoint
ALTER TABLE "t3test_session" DROP COLUMN IF EXISTS "id";
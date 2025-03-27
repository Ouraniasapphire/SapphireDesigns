
# Sapphire Designs

## License

This project is licensed under the [MIT License](LICENSE).


## Usage/Examples

```bash
$ npm i
```

## Environment Variables

To run this project, do the followig:

- Add the following environment variables to your .env file


```env
VITE_SUPABASE_KEY=SUPABASE API KEY

VITE_SUPABASE_URL=SUPABASE APP URL

ZOHO_EMAIL=ZOHO EMAIL

ZOHO_PASS=ZOHO APP PASSWORD
```

## Database 

- Enter this sql into your database,

```sql 
create table public.newsletter_emails (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  email text not null,
  confirmed boolean null default false,
  confirmation_token text null,
  constraint newsletter_emails_pkey primary key (id),
  constraint newsletter_emails_confirmed_token_key unique (confirmation_token),
  constraint newsletter_emails_email_key unique (email)
) TABLESPACE pg_default;
```

Or 

- Create a new Supabase table named 'newsletter_emails' and add the following, 

| Name              | Data Type  | Default value    |
| ------------------| -----------| -----------------|
| id                | uuid       | gen_random_uuid()|
| created_at        | timestampz | now()            |
| email             | text       |                  |
| confirmation_token| text       |                  |
| confirmed         | bool       | false            |

## Available Scripts

### `npm run dev` or `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`
Builds the app for production to the `dist` folder.  
The build is minified and the filenames include the hashes.

## Deployment

You can deploy the `dist` folder.


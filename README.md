
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
- Create a new Supabase table named 'newsletter_emails' and add the following,  
  
|  Name      | Data Type  | 
| -----------| -----------|
| id         | uuid       |
| created_at | timestampz |
| email      | text       |

## Available Scripts

### `npm run dev` or `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`
Builds the app for production to the `dist` folder.  
The build is minified and the filenames include the hashes.

## Deployment

You can deploy the `dist` folder.


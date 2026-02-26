# NextAPI

Live at: `https://nextapi.asasvirtuais.dev`

## 🔐 Auth

Header: `Authorization: <YOUR_API_KEY>`

---

## 🏛️ Airtable Proxy

`POST/GET/PATCH/DELETE` to:
`https://nextapi.asasvirtuais.dev/api/v1/airtable/[baseId]/[tableName]/[recordId?]`

*   **GET**: List (with query params) or Find (with ID).
*   **POST**: Create record.
*   **PATCH**: Update record.
*   **DELETE**: Remove record.

---

## 🎨 NovelAI Draw

Generate PNG images from prompts.

*   **Endpoint:** `POST https://nextapi.asasvirtuais.dev/api/v1/draw`
*   **Body:**
    ```json
    {
      "prompt": "string",
      "negativePrompt": "string (optional)",
      "orientation": "portrait | landscape | square (default)",
      "model": "string (default: nai-diffusion-4-5-full)",
      "seed": "number",
      "steps": "number (default: 28)",
      "scale": "number (default: 5)"
    }
    ```

---

## ⚙️ Environment

- `API_KEY`: Auth secret.
- `AIRTABLE_TOKEN`: Airtable PAT.
- `NOVELAI_API_KEY`: NovelAI key.

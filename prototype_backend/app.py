from fastapi import FastAPI, Request
from pydantic import BaseModel
from model_loader import load_translation_model
from utils import translate_text
from region_map import REGION_TO_LANG
from uuid import uuid4

app = FastAPI()

print("Initializing model...")
model, tokenizer, device = load_translation_model()
print("NLLB model ready!")

class TranslateRequest(BaseModel):
    text: str
    region: str

@app.post("/translate")
def translate(req: TranslateRequest):
    req_region = req.region.lower()
    tgt_lang = REGION_TO_LANG.get(req_region, "hin_Deva")  # default Hindi

    result = translate_text(
        req.text,
        tgt_lang,
        model,
        tokenizer,
        device
    )

    return {
        "source_language": "eng_Latn",
        "target_language": tgt_lang,
        "translated": result
    }


# for Agora Conversational AI integration
@app.post("/publify_translate_callback")
async def publify_translate_callback(req: Request):
    
    data = await req.json() # Parse JSON body

    user_msg = data["messages"][-1]["content"] # Get the last message content

    # Safeguard: Ensure user_msg is in English, as Agora ASR can give non-English text
    english_text = translate_text(user_msg, "eng_Latn", model, tokenizer, device)

    # Determine target language from user_lang field
    sanitized_lang = data.get("user_lang", "hi_IN").replace("-", "_")

    final_translation = translate_text(
        english_text,
        sanitized_lang,
        model,
        tokenizer,
        device
    )

    #OpenAI Result Format
    return {
        "id": str(uuid4()),
        "object":"chat.completion",
        "choices":[
            {
                "index":0,
                "message":{
                    "role":"publify_agent",
                    "content": final_translation
                },
                "finish_reason":"stop"
            }
        ]

    }


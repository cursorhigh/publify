from fastapi import FastAPI
from pydantic import BaseModel
from model_loader import load_translation_model
from utils import translate_text
from region_map import REGION_TO_LANG

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

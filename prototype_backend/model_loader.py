import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

MODEL_DIR = r"C:\Users\Lenovo\nllb_1.3B"

def load_translation_model():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    print(f"Loading NLLB-200 1.3B on: {device}")

    tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR)

    model = AutoModelForSeq2SeqLM.from_pretrained(
        MODEL_DIR,
        torch_dtype=torch.float16 if device.type == "cuda" else torch.float32,
        device_map="auto" if device.type == "cuda" else None
    )

    return model, tokenizer, device

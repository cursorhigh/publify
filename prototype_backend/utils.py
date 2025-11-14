import time
import torch

def translate_text(text, tgt_lang, model, tokenizer, device):
    start = time.time()

    tokenizer.src_lang = "eng_Latn"

    encoded = tokenizer(text, return_tensors="pt").to(device)

    bos_token_id = tokenizer.convert_tokens_to_ids(tgt_lang)

    with torch.inference_mode():
        out = model.generate(
            **encoded,
            forced_bos_token_id=bos_token_id,
            num_beams=1,
            do_sample=False,
            max_new_tokens=256,
            repetition_penalty=1.8,
            no_repeat_ngram_size=4
        )

    decoded = tokenizer.decode(out[0], skip_special_tokens=True)
    decoded = decoded.replace("▁", " ")
    decoded = " ".join(decoded.split())

    print(f"Translated in {time.time() - start:.2f}s")
    return decoded

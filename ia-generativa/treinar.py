from transformers import Trainer, TrainingArguments, AutoModelForCausalLM, AutoTokenizer,  DataCollatorForLanguageModeling
from datasets import load_dataset

model = AutoModelForCausalLM.from_pretrained("distilgpt2")
tokenizer = AutoTokenizer.from_pretrained("distilgpt2")
tokenizer.pad_token = tokenizer.eos_token

dataset = load_dataset("text", data_files={"train": "dados_de_treinamento.txt"})
def tokenize_function(examples):
    return tokenizer(
        examples["text"],
        padding="max_length",     
        truncation=True,
        max_length=128           
    )


data_collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer,
    mlm=False 
)

tokenized_datasets = dataset.map(tokenize_function, batched=True)

training_args = TrainingArguments(
    output_dir="./distilgpt2-finetuned",
    per_device_train_batch_size=10,
    dataloader_num_workers=5,  # Ajuste conforme o número de núcleos da sua CPU
    num_train_epochs=1000,  # Aumente esse valor para treinar por mais épocas
    save_steps=500,
    logging_dir="./logs",
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    data_collator=data_collator
)

trainer.train()

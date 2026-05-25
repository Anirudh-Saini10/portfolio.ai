# SpamSentry — SMS Spam Classifier

## Overview
SpamSentry is a fine-tuned DistilBERT model that classifies SMS messages as
spam or ham. It is exposed as a live interactive web app so anyone can paste a
message and get an instant prediction.

## Tech Stack
- PyTorch for model training
- Hugging Face Transformers and Trainer API
- DistilBERT as the pretrained base model
- SMS Spam Collection dataset (5,574 samples)
- Streamlit for the deployed app
- Streamlit Cloud for hosting

## How It Works
1. The SMS Spam Collection dataset is preprocessed with a custom PyTorch
   tokenization pipeline.
2. A classification head is added on top of pretrained DistilBERT.
3. The model is fine-tuned with the Hugging Face Trainer API using AdamW and
   CrossEntropyLoss for three epochs on CPU.
4. The trained model is loaded into a Streamlit app where the user pastes a
   message and receives a spam or ham prediction with confidence.

## Outcomes
- Achieved 97 percent plus accuracy on the SMS Spam Collection dataset.
- Demonstrates transfer learning, fine-tuning a transformer end-to-end on
  modest hardware, and shipping the result as a live demo.

## Links
- Live demo: https://spamsentry-scam-detector.streamlit.app/

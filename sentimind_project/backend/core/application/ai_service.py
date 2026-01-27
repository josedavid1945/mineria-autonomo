"""
Motor de Minería de Texto basado en Transformers.
Usa el modelo XLM-RoBERTa cargado localmente.
"""
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
import os


class MiningEngine:
    """
    Motor de Minería de Texto basado en Transformers.
    Patrón Singleton para cargar el modelo en memoria una sola vez.
    
    Características:
    - Clasificación Zero-Shot multilingüe (optimizado para español)
    - Soporte multi-label (un post puede tener múltiples emociones)
    - Umbral configurable para detectar emociones secundarias
    """
    
    # Lista expandida de categorías para la red social (12 categorías seleccionadas)
    TAXONOMY = [
        # Emociones básicas
        "Alegría", "Tristeza", "Enojo", "Miedo", "Sorpresa", "Asco",
        # Emociones sociales importantes
        "Amor", 
        # Contenido
        "Humor", "Inspiración", "Queja", "Reflexión",
        # Especial
        "Sarcasmo"
    ]
    
    # Mapeo de etiquetas a hypothesis templates en español para mejor precisión
    HYPOTHESIS_TEMPLATE = "Este texto expresa {}"
    
    # Umbral mínimo de confianza (porcentaje del score máximo)
    # Una emoción secundaria debe tener al menos 90% del score de la primaria
    RELATIVE_THRESHOLD = 0.90
    
    # Máximo de emociones a retornar
    MAX_EMOTIONS = 3

    _classifier = None

    @classmethod
    def get_classifier(cls):
        if cls._classifier is None:
            print("[AI] Cargando modelo neuronal multilingue XLM-RoBERTa... (esto pasa solo una vez)")
            
            # Modelo multilingüe potente
            model_name = "joeddav/xlm-roberta-large-xnli"
            
            try:
                # Cargar tokenizer con sentencepiece (use_fast=False)
                print(f"[AI] Cargando tokenizer para {model_name}...")
                tokenizer = AutoTokenizer.from_pretrained(
                    model_name, 
                    use_fast=False,
                    local_files_only=False
                )
                
                print(f"[AI] Cargando modelo {model_name}...")
                cls._classifier = pipeline(
                    "zero-shot-classification",
                    model=model_name,
                    tokenizer=tokenizer,
                    device=-1  # CPU
                )
                print(f"[OK] Modelo {model_name} cargado exitosamente!")
                
            except Exception as e:
                print(f"[WARN] Error cargando XLM-RoBERTa: {e}")
                print("[AI] Intentando con modelo BART (fallback)...")
                
                try:
                    model_name = "facebook/bart-large-mnli"
                    cls._classifier = pipeline(
                        "zero-shot-classification",
                        model=model_name,
                        device=-1
                    )
                    print(f"[OK] Modelo fallback {model_name} cargado!")
                except Exception as e2:
                    print(f"[ERROR] Error tambien con fallback: {e2}")
                    raise RuntimeError(f"No se pudo cargar ningún modelo: {e}, {e2}")
                
        return cls._classifier

    @classmethod
    def analyze(cls, text: str) -> dict:
        """
        Analiza un texto y retorna múltiples emociones detectadas.
        
        Returns:
            dict: {
                "emotions": [{"name": "Alegría", "confidence": 0.85}, ...],
                "main_sentiment": "Alegría",
                "confidence_score": 0.85,
                "all_scores": {...}
            }
        """
        print(f"[AI] Analizando: '{text[:50]}...'")
        
        classifier = cls.get_classifier()
        
        # Inferencia con multi_label=True para detectar múltiples emociones
        result = classifier(
            text, 
            cls.TAXONOMY, 
            hypothesis_template=cls.HYPOTHESIS_TEMPLATE,
            multi_label=True
        )
        
        # Crear diccionario de scores
        all_scores = dict(zip(result['labels'], result['scores']))
        
        # Obtener el score máximo para calcular umbrales relativos
        max_score = result['scores'][0]
        threshold = max_score * cls.RELATIVE_THRESHOLD
        
        # Filtrar emociones que superen el umbral relativo
        detected_categories = []
        for label, score in zip(result['labels'], result['scores']):
            if score >= threshold and len(detected_categories) < cls.MAX_EMOTIONS:
                detected_categories.append({
                    "name": label,
                    "confidence": round(score, 2)
                })
        
        # Si ninguna supera el umbral, tomar la más alta
        if not detected_categories:
            detected_categories = [{
                "name": result['labels'][0],
                "confidence": round(result['scores'][0], 2)
            }]
        
        print(f"[OK] Resultado: {detected_categories[0]['name']} ({detected_categories[0]['confidence']})")
        
        return {
            "emotions": detected_categories,
            "main_sentiment": result['labels'][0],
            "confidence_score": round(result['scores'][0], 2),
            "all_scores": {k: round(v, 2) for k, v in all_scores.items()},
            "method": "xlm-roberta-local"
        }


"""
Agent Kimi pour la génération de code
Utilise l'API Moonshot Kimi pour générer du code Python
"""

import os
import json
import requests
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

class KimiCodeGenerator:
    def __init__(self):
        """Initialise l'agent Kimi"""
        self.api_key = os.getenv('KIMI_API_KEY')
        self.api_url = os.getenv('KIMI_API_URL')
        self.model = "moonshot-v1"
        
        if not self.api_key:
            raise ValueError("KIMI_API_KEY non trouvée dans les variables d'environnement")
    
    def generate_code(self, prompt: str, language: str = "python") -> str:
        """
        Génère du code en utilisant l'API Kimi
        
        Args:
            prompt: Description du code à générer
            language: Langage de programmation (défaut: python)
        
        Returns:
            Le code généré par Kimi
        """
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        # Message système pour diriger Kimi vers la génération de code
        system_message = f"""Tu es un expert en programmation {language}. 
Tu dois générer du code de qualité, bien structuré et commenté.
Réponds UNIQUEMENT avec le code, sans explications supplémentaires.
Encapsule le code dans les balises \`\`\`{language}\n...\n\`\`\`"""
        
        payload = {
            "model": self.model,
            "messages": [
                {
                    "role": "system",
                    "content": system_message
                },
                {
                    "role": "user",
                    "content": f"Génère du code {language}:\n{prompt}"
                }
            ],
            "temperature": 0.7,
            "max_tokens": 2000
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/chat/completions",
                headers=headers,
                json=payload,
                timeout=30
            )
            response.raise_for_status()
            
            result = response.json()
            code = result['choices'][0]['message']['content']
            
            return code
            
        except requests.exceptions.RequestException as e:
            return f"Erreur lors de l'appel à l'API Kimi: {str(e)}"
    
    def refactor_code(self, code: str, improvements: str) -> str:
        """
        Refactorise du code existant
        
        Args:
            code: Le code à améliorer
            improvements: Description des améliorations souhaitées
        
        Returns:
            Le code refactorisé
        """
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": self.model,
            "messages": [
                {
                    "role": "system",
                    "content": "Tu es un expert en refactorisation de code. Améliore le code fourni selon les instructions."
                },
                {
                    "role": "user",
                    "content": f"Voici le code à améliorer:\n\n```python\n{code}\n```\n\nAmélorations souhaitées: {improvements}"
                }
            ],
            "temperature": 0.7,
            "max_tokens": 2000
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/chat/completions",
                headers=headers,
                json=payload,
                timeout=30
            )
            response.raise_for_status()
            
            result = response.json()
            refactored_code = result['choices'][0]['message']['content']
            
            return refactored_code
            
        except requests.exceptions.RequestException as e:
            return f"Erreur lors de l'appel à l'API Kimi: {str(e)}"


def main():
    """Exemple d'utilisation de l'agent Kimi"""
    print("=== Agent Kimi - Générateur de Code ===\n")
    
    try:
        agent = KimiCodeGenerator()
        print("✓ Connexion à l'API Kimi établie\n")
        
        # Exemple 1: Générer une fonction de tri
        print("Exemple 1: Génération d'une fonction de tri")
        print("-" * 50)
        prompt1 = "Crée une fonction Python qui trie une liste de nombres en ordre croissant et retourne la liste triée"
        print(f"Prompt: {prompt1}\n")
        
        code1 = agent.generate_code(prompt1)
        print("Code généré:")
        print(code1)
        print("\n")
        
        # Exemple 2: Générer une classe
        print("Exemple 2: Génération d'une classe")
        print("-" * 50)
        prompt2 = "Crée une classe Python 'Person' avec des attributs (nom, age, email) et des méthodes pour afficher les infos et mettre à jour l'age"
        print(f"Prompt: {prompt2}\n")
        
        code2 = agent.generate_code(prompt2)
        print("Code généré:")
        print(code2)
        
    except Exception as e:
        print(f"❌ Erreur: {str(e)}")


if __name__ == "__main__":
    main()

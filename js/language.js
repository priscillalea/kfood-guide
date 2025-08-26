// Language Management System
class LanguageManager {
  constructor() {
    this.currentLanguage = "pt"
    this.translations = {}
    this.init()
  }

  async init() {
    await this.loadTranslations()
    this.detectLanguage()
    this.setupLanguageSelector()
    this.translatePage()
  }

  async loadTranslations() {
    try {
      const response = await fetch("data/content.json")
      this.translations = await response.json()
    } catch (error) {
      console.error("Error loading translations:", error)
      // Fallback to Portuguese if loading fails
      this.currentLanguage = "pt"
    }
  }

  detectLanguage() {
    // Check if language is stored in localStorage
    const storedLanguage = localStorage.getItem("selectedLanguage")
    if (storedLanguage && this.translations[storedLanguage]) {
      this.currentLanguage = storedLanguage
      return
    }

    // Detect browser language
    const browserLanguage = navigator.language || navigator.userLanguage
    const languageCode = browserLanguage.split("-")[0]

    // Map browser languages to available translations
    const languageMap = {
      pt: "pt",
      en: "en",
      ko: "ko",
    }

    this.currentLanguage = languageMap[languageCode] || "pt"
    localStorage.setItem("selectedLanguage", this.currentLanguage)
  }

  setupLanguageSelector() {
    const languageSelect = document.getElementById("languageSelect")
    if (languageSelect) {
      languageSelect.value = this.currentLanguage
      languageSelect.addEventListener("change", (e) => {
        this.changeLanguage(e.target.value)
      })
    }
  }

  changeLanguage(languageCode) {
    if (this.translations[languageCode]) {
      this.currentLanguage = languageCode
      localStorage.setItem("selectedLanguage", languageCode)
      this.translatePage()

      // Update HTML lang attribute
      document.documentElement.lang = languageCode
    }
  }

  translatePage() {
    const elements = document.querySelectorAll("[data-key]")
    elements.forEach((element) => {
      const key = element.getAttribute("data-key")
      const translation = this.getTranslation(key)
      if (translation) {
        element.textContent = translation
      }
    })
  }

  getTranslation(key) {
    const keys = key.split(".")
    let translation = this.translations[this.currentLanguage]

    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k]
      } else {
        // Fallback to Portuguese if translation not found
        translation = this.translations["pt"]
        for (const fallbackKey of keys) {
          if (translation && translation[fallbackKey]) {
            translation = translation[fallbackKey]
          } else {
            return key // Return key if no translation found
          }
        }
        break
      }
    }

    return translation
  }

  getCurrentLanguage() {
    return this.currentLanguage
  }
}

// Initialize language manager
const languageManager = new LanguageManager()

// Export for use in other scripts
window.languageManager = languageManager

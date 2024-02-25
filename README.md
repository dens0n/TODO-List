# TODO List App

Uppgift från Chas Academy

En enkel webbapplikation för att hantera en lista över att göra-uppgifter.

## Krav på funktionalitet:

Varje uppgift ska ha:
- Ett unikt ID
- En beskrivande text
- Status om uppgiften är klar eller inte

Användaren ska kunna:
- Se alla uppgifter
- Lägga till en uppgift
- Ta bort en uppgift
- Toggla om en uppgift är klar eller inte
- Rensa hela listan

## Användningsinstruktioner

1. Öppna applikationen i din webbläsare.
2. Du kommer att se en lista över dina uppgifter (om det finns några sparade).
3. Använd formuläret längst upp för att lägga till en ny uppgift. Skriv in uppgiftens beskrivande text och klicka på "Lägg till".
4. För att markera en uppgift som klar, klicka på kryssrutan bredvid uppgiften.
5. För att ta bort en uppgift, klicka på "X" bredvid uppgiften.
6. Om du vill rensa hela listan från uppgifter, klicka på "Rensa" knappen.

## Tekniska detaljer

Denna applikation är byggd med HTML, CSS och TypeScript. Den använder även localStorage för att spara uppgifterna lokalt i webbläsaren.



## Funktioner

- Lägg till nya uppgifter
- Markera uppgifter som klara
- Ta bort uppgifter
- Töm hela listan
- Flytta runt ordningen av listan med Drag & Drop

## Teknologier

- HTML
- CSS
- TypeScript

## Användning

1. Klona projektet till din lokala maskin.
2. Kör kommandot `npm install` för att installera projektets beroenden.
3. Kör kommandot `npm run dev` för att starta utvecklingsservern och köra webbapplikationen i din webbläsare.


## Skärmdump

![Skärmdump av TODO List App](/src/images/screenshot.png)

## Resonemang om koden

### 1. Struktur

Projektet följer en modulär struktur där HTML, CSS och TypeScript är separerade i olika filer för bättre läsbarhet och underhåll.

- `index.html`: Innehåller den grundläggande layouten för webbappen.
- `styles.css`: Stildefinitioner för att göra gränssnittet attraktivt och användarvänligt.
- `todo.ts`: Huvudlogik för att hantera att-göra-uppgifter, inklusive tillägg, borttagning och markering av uppgifter som klara.

### 2. Typer och Gränssnitt

- Användningen av typer och gränssnitt i TypeScript gör koden mer robust och lättläst.
- `Todo`-gränssnittet definierar strukturen för en att-göra-uppgift, vilket gör det tydligt vilka egenskaper varje uppgift har.

### 3. Lokal lagring

- Projektet använder localStorage för att lagra att-göra-uppgifter mellan sessioner.
- `saveTodo()` och `loadTodo()` funktionerna möjliggör sparande och laddning av att-göra-listan från localStorage.
- Detta ger användaren möjlighet att stänga webbläsaren och återvända senare utan att förlora sina uppgifter.

### 4. Användarinteraktion

- Användarinteraktion hanteras smidigt med händelselyssnare och DOM-manipulation.
- När en uppgift läggs till eller uppdateras, uppdateras DOM:en direkt för att återspegla ändringarna utan att behöva ladda om sidan.
- Tydliga visuella indikatorer (bockmarkering och genomstruket text) visar status för varje uppgift.

### 5. Animeringar

- Vid borttagning av en uppgift läggs en animering till för att göra användarupplevelsen mer tillfredsställande.
- Detta ger en visuell feedback till användaren och ger en känsla av responsivitet till applikationen.

### 6. Dokumentation

- Koden är väldokumenterad med kommentarer för att förklara varje del av koden och dess syfte.
- Detta underlättar för andra utvecklare att förstå och vidareutveckla koden.

Genom att följa dessa principer och metoder har projektet blivit en välstrukturerad och lättförståelig webbapplikation för hantering av att-göra-listor.

### 7. valfri funktionalitet

- Drag and drop funktion som möjliggör för användaren att flytta runt de olika list elementen så att ordningen ändras.
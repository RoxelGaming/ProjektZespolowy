'use client'

export default function AnimatedWaves() {
  return (
    // overflow-hidden jest tu kluczowe, żeby ogromne kręcące się kwadraty nie powiększały nam strony
    <div className="absolute inset-0 z-0 overflow-hidden bg-gray-950 pointer-events-none">
      
      {/* Kontener trzymający fale na samym dole ekranu */}
      <div className="absolute 
                      z-0 
                      bottom-[-10%] 
                      left-[-50%] 
                      w-[200%] 
                      h-[50vh] 
                      md:h-[60vh]
                      ">
        
        {/* Pierwsza fala - ciemniejsza, wolniejsza, pod spodem */}
        <div 
          className="absolute 
                     top-0 
                     left-[50%] 
                     w-[150vw] 
                     h-[150vw] 
                     max-w-[2000px] 
                     max-h-[2000px] 
                     ml-[-75vw] 
                     max-md:ml-[-950px] 
                     rounded-[43%] 
                     bg-indigo-900
                     animate-wave-slow
                     "
        />
        
        {/* Druga fala - jaśniejsza, szybsza, lekko przesunięta, na wierzchu */}
        <div 
          className="absolute
                     top-[5%] 
                     left-[50%] 
                     w-[140vw] 
                     h-[140vw] 
                     max-w-[1900px] 
                     max-h-[1900px] 
                     ml-[-70vw] 
                     max-md:ml-[-1000px] 
                     rounded-[40%] 
                     bg-indigo-600
                     animate-wave-fast"
        />
        
      </div>
      
      {/* Ciemny overlay dla lepszej czytelności tekstu (opcjonalny, lekko przyciemnia całość) */}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const slides = [
  { id: 1, title: "Slide 1", color: "from-blue-500/20 to-blue-500/5" },
  { id: 2, title: "Slide 2", color: "from-purple-500/20 to-purple-500/5" },
  { id: 3, title: "Slide 3", color: "from-green-500/20 to-green-500/5" },
  { id: 4, title: "Slide 4", color: "from-orange-500/20 to-orange-500/5" },
  { id: 5, title: "Slide 5", color: "from-pink-500/20 to-pink-500/5" },
];

export default function CarouselPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Carousel</h1>
        <p className="text-muted-foreground">輪播元件，支援滑動切換與前後按鈕控制。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">基本輪播</h2>
        <div className="p-6 border rounded-xl bg-card">
          <Carousel className="w-full max-w-sm mx-auto">
            <CarouselContent>
              {slides.map((slide) => (
                <CarouselItem key={slide.id}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div className={`w-full h-full bg-gradient-to-br ${slide.color} rounded-lg flex items-center justify-center`}>
                        <span className="text-2xl font-bold text-muted-foreground">{slide.title}</span>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">一次顯示多個</h2>
        <div className="p-6 border rounded-xl bg-card">
          <Carousel
            opts={{ align: "start" }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {slides.map((slide) => (
                <CarouselItem key={slide.id} className="pl-2 md:basis-1/2 lg:basis-1/3">
                  <Card>
                    <CardContent className="flex aspect-video items-center justify-center p-4">
                      <div className={`w-full h-full bg-gradient-to-br ${slide.color} rounded-md flex items-center justify-center`}>
                        <span className="font-semibold text-muted-foreground">{slide.title}</span>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  );
}

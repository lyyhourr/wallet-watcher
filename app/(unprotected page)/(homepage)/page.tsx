import { fontHeader, fontHero } from "@/fonts/Fonts";

export default function Home() {
  return (
    <main className="flex flex-col gap-36 my-20 text-center">
      <p className={`${fontHero.className} text-9xl text-orange `}>
        Hero text hero text <br /> hero text hero text
      </p>
      <p className={`text-center text-3xl ${fontHeader.className}`}>
        Welcome User
      </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero sit voluptas maiores quasi reprehenderit blanditiis nostrum expedita non quam ex, deserunt cumque eveniet optio veritatis ipsa commodi quas sint qui.</p>

    </main>
  )
}

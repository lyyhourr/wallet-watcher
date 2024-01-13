import { Poppins, Bebas_Neue, Fjalla_One, Inter } from "next/font/google";

const fontHero = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const fontText = Poppins({ subsets: ["latin"], weight: "400" });

const fontHeader = Fjalla_One({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"], weight: "500" });

export { fontHero, fontHeader, fontText, inter };

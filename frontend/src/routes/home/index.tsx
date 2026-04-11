import Header from "../../components/home/header";
import Footer from "../../components/home/footer";

import CategoriesArea from "../../components/home/categories-area";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 px-10 py-4 max-w-7xl mx-auto overflow">
      <Header />

      <CategoriesArea />

      <Footer />
    </main>
  );
}

import { BirthDataForm } from "./components/birth-data-form"
import { SiteHeader } from "./components/site-header"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <SiteHeader />
      <main className="container px-4 py-8 mx-auto">
        <div className="grid gap-8 md:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div className="prose">
              <h1 className="text-2xl font-bold text-red-800">八字算命</h1>
              <p className="text-gray-600">请输入阳历生日，点击下面按钮开始</p>
            </div>
            <BirthDataForm />
            <div className="prose">
              <h2 className="text-xl font-bold text-red-800">八字算命简介</h2>
              <p className="text-gray-600">
                什么是八字算命？简而言之，八字算命是指根据人的出生时间（生辰）排成命局，共有八个字（即生辰八字），结合八字的五行相生相克规律进行分析，所以称为生辰八字算命，是算命方法的一种。预测结果仅供参考。
              </p>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="mb-4 text-lg font-semibold text-red-800">大师测算</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-red-600">
                    2025年流年运势详批
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-red-600">
                    八字精批财运分析
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-red-600">
                    事业运程测算
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}


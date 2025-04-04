import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import { Instagram, Twitter, Facebook, Mail } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="w-full bg-white">
      {/* Ghana flag colors bar */}
      <div className="w-full h-1 flex">
        <div className="w-1/3 h-full bg-red-500"></div>
        <div className="w-1/3 h-full bg-yellow-400"></div>
        <div className="w-1/3 h-full bg-green-500"></div>
      </div>

      {/* Newsletter section */}
      <div className="w-full bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-2xl font-bold mb-2">Join the movement</h3>
              <p className="text-gray-600">
                Get exclusive offers, Ghana-inspired style tips and updates on
                new merch drops.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button className="bg-black text-white px-6 py-3 rounded-lg font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand section */}
          <div className="col-span-1">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-bold text-black mb-4 block"
            >
              Make Ghana Great
            </LocalizedClientLink>
            <p className="text-gray-600 mb-6">
              Premium quality apparel celebrating Ghanaian heritage and culture.
            </p>
            {/* <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-black transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-black transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-black transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-black transition-colors"
              >
                <Mail size={20} />
              </a>
            </div> */}
          </div>

          {/* Categories */}
          {productCategories && productCategories?.length > 0 && (
            <div className="col-span-1">
              <h3 className="font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                {productCategories?.slice(0, 6).map((c) => {
                  if (c.parent_category) {
                    return null
                  }

                  return (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="text-gray-600 hover:text-black transition-colors"
                        href={`/categories/${c.handle}`}
                        data-testid="category-link"
                      >
                        {c.name}
                      </LocalizedClientLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* Collections */}
          {collections && collections.length > 0 && (
            <div className="col-span-1">
              <h3 className="font-bold mb-4">Collections</h3>
              <ul className="space-y-2">
                {collections?.slice(0, 6).map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink
                      className="text-gray-600 hover:text-black transition-colors"
                      href={`/collections/${c.handle}`}
                    >
                      {c.title}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick links */}
          {/* <div className="col-span-1">
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <LocalizedClientLink
                  href="/about"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  About Us
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/contact"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Contact
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/faqs"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  FAQs
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/shipping"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Shipping & Returns
                </LocalizedClientLink>
              </li>
              <li>
                <a
                  href="https://github.com/medusajs/nextjs-starter-medusa"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Source Code
                </a>
              </li>
            </ul>
          </div> */}
        </div>

        {/* Bottom section with copyright and payment methods */}
        <div className="py-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Text className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Make Ghana Great. All rights
              reserved.
            </Text>

            <div className="flex items-center gap-3">
              <div className="flex space-x-2">
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

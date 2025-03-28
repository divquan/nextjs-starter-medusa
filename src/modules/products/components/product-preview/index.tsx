import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import type { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const pricedProduct = await listProducts({
    regionId: region.id,
    queryParams: { id: [product.id!] },
  }).then(({ response }) => response.products[0])

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block transition-all duration-300 relative overflow-hidden"
    >
      <div data-testid="product-wrapper" className="flex flex-col h-full">
        <div className="relative overflow-hidden rounded-lg">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
          <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-5"></div>

          {/* Subtle overlay line animation on hover */}
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full"></div>
        </div>

        <div className="flex flex-col mt-4 space-y-1 p-1">
          <div className="flex justify-between items-start">
            <Text
              className="text-ui-fg-base font-medium transition-colors duration-200 group-hover:text-black"
              data-testid="product-title"
            >
              {product.title}
            </Text>

            <div className="flex items-center gap-x-2">
              {cheapestPrice && (
                <PreviewPrice
                  price={cheapestPrice}
                  className="font-medium text-ui-fg-base transition-colors duration-200 group-hover:text-black"
                />
              )}
            </div>
          </div>

          {product.collection && (
            <Text className="text-ui-fg-subtle text-sm">
              {product.collection.title}
            </Text>
          )}

          {/* Add a subtle "View product" text that appears on hover */}
          <div className="mt-auto pt-2">
            <span className="text-sm text-ui-fg-subtle opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 inline-block">
              View product
              <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}

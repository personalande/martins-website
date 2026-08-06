import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load the homepage and display key elements', async ({ page }) => {
    await page.goto('/')

    // Check title containing brand name
    await expect(page).toHaveTitle(/Ferragens Martins/)

    // Check header presence and brand logo
    const headerBrand = page.locator('header')
    await expect(headerBrand).toBeVisible()

    // Check Hero headings
    const heroHeading = page.locator('h1')
    await expect(heroHeading).toBeVisible()

    // Check CTAs
    const viewCatalogBtn = page.getByRole('link', { name: /Ver Catálogo/i })
    await expect(viewCatalogBtn).toBeVisible()

    const requestQuoteBtn = page.getByRole('button', { name: /Solicitar Orçamento/i })
    // If quote button is not a link but a button that opens quote/WhatsApp or drawer
    if (await requestQuoteBtn.count() > 0) {
      await expect(requestQuoteBtn).toBeVisible()
    }

    // Check categories section
    const categoriesHeading = page.getByRole('heading', { name: /NOSSAS CATEGORIAS/i })
    await expect(categoriesHeading).toBeVisible()

    // Check stores section
    const storesHeading = page.getByRole('heading', { name: /NOSSAS LOJAS/i })
    await expect(storesHeading).toBeVisible()
  })
})

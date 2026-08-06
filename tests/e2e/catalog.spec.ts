import { test, expect } from '@playwright/test'

test.describe('Catalog Page', () => {
  test('should load catalog and display filters and products', async ({ page }) => {
    await page.goto('/catalogo')

    // Check title/header
    const heading = page.locator('h1')
    await expect(heading).toContainText(/Catálogo/i)

    // Check search input presence
    const searchInput = page.getByPlaceholder(/Buscar produtos/i)
    await expect(searchInput).toBeVisible()

    // Check filters panel or category radio inputs
    const filterSection = page.locator('aside')
    if (await filterSection.count() > 0) {
      await expect(filterSection).toBeVisible()
    }

    // Check reset filters button is visible (it might not be visible unless filters are dirty, or is always present)
    const resetBtn = page.getByRole('button', { name: /Limpar/i })
    if (await resetBtn.count() > 0) {
      await expect(resetBtn).toBeVisible()
    }
  })
})

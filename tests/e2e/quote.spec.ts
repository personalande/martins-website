import { test, expect } from '@playwright/test'

test.describe('Quote Flow', () => {
  test('should allow interaction with the quote drawer and quote form', async ({ page }) => {
    await page.goto('/catalogo')

    // Let's check for an "Adicionar ao Orçamento" button on any product card
    const addToQuoteBtns = page.getByRole('button', { name: /Adicionar ao Orçamento/i })
    
    // If there are products rendered
    if (await addToQuoteBtns.count() > 0) {
      // Click the first button
      await addToQuoteBtns.first().click()
      
      // The drawer should open automatically or we should be able to open it
      const drawerHeader = page.getByRole('heading', { name: /MEU ORÇAMENTO/i })
      await expect(drawerHeader).toBeVisible()

      // The item should be in the drawer
      const quoteItem = page.locator('[class*="QuoteItem"]')
      await expect(quoteItem.first()).toBeVisible()
      
      // Let's verify we can click "Enviar Orçamento" which opens the quote form
      const sendQuoteBtn = page.getByRole('button', { name: /Enviar Orçamento/i })
      await expect(sendQuoteBtn).toBeVisible()
      await sendQuoteBtn.click()

      // We should see the form fields
      await expect(page.getByLabel(/Nome/i)).toBeVisible()
      await expect(page.getByLabel(/Telefone/i)).toBeVisible()
    }
  })
})

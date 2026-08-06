import React from 'react'
import { renderToBuffer } from '@react-pdf/renderer'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import { Quote, QuoteItem } from '@/types'
import { formatCurrency, formatDateBR } from '@/lib/utils/format'

// Register default fallback fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica.ttf', fontWeight: 'normal' },
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Bold.ttf', fontWeight: 'bold' },
  ],
})

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#202328',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#062A56',
    borderBottomStyle: 'solid',
    paddingBottom: 15,
    marginBottom: 15,
  },
  companyTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#062A56',
  },
  companySub: {
    fontSize: 9,
    color: '#6C747A',
    marginTop: 2,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  docTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#D71920',
  },
  docSub: {
    fontSize: 8,
    color: '#6C747A',
    marginTop: 2,
  },
  metaBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F7F4EE',
    padding: 10,
    borderRadius: 4,
    marginBottom: 15,
  },
  metaCol: {
    flexDirection: 'column',
  },
  metaLabel: {
    fontSize: 8,
    color: '#6C747A',
    textTransform: 'uppercase',
  },
  metaVal: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#062A56',
    marginBottom: 8,
    marginTop: 5,
  },
  table: {
    width: '100%',
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#062A56',
    color: '#FFFFFF',
    padding: 6,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 9,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#D8D5CE',
    borderBottomStyle: 'solid',
    padding: 6,
    alignItems: 'center',
  },
  tableRowAlt: {
    backgroundColor: '#F9F8F6',
  },
  colNum: { width: '8%' },
  colItem: { width: '47%' },
  colCode: { width: '15%' },
  colQty: { width: '15%', textAlign: 'right' },
  colPrice: { width: '15%', textAlign: 'right' },

  totalBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  totalInner: {
    backgroundColor: '#F7F4EE',
    padding: 10,
    borderRadius: 4,
    width: '40%',
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: 9,
    color: '#6C747A',
  },
  totalVal: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#062A56',
    marginTop: 2,
  },
  disclaimerBox: {
    borderWidth: 1,
    borderColor: '#F6B719',
    backgroundColor: '#FFFDF5',
    padding: 10,
    borderRadius: 4,
    marginBottom: 15,
  },
  disclaimerTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#A56400',
    marginBottom: 3,
  },
  disclaimerText: {
    fontSize: 8,
    color: '#6C747A',
    lineHeight: 1.3,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#D8D5CE',
    borderTopStyle: 'solid',
    paddingTop: 8,
    fontSize: 8,
    color: '#6C747A',
  },
})

interface QuotePDFProps {
  quote: Quote
  items: QuoteItem[]
}

const QuotePDFDocument: React.FC<QuotePDFProps> = ({ quote, items }) => {
  const hasHiddenPrice = items.some(
    (item) => item.price_mode_snapshot !== 'EXACT' || item.public_unit_price_snapshot === null,
  )

  return (
    <Document title={`solicitacao-orcamento-${quote.protocol}`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.companyTitle}>FERRAGENS MARTINS</Text>
            <Text style={styles.companySub}>
              Da base ao acabamento, a obra não pode parar.
            </Text>
            <Text style={styles.companySub}>
              Paranaguá - PR | Vila São Vicente & Vila Itiberê
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.docTitle}>SOLICITAÇÃO DE ORÇAMENTO</Text>
            <Text style={styles.docSub}>DOCUMENTO NÃO FISCAL</Text>
          </View>
        </View>

        {/* Metadata */}
        <View style={styles.metaBox}>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>Protocolo</Text>
            <Text style={styles.metaVal}>{quote.protocol}</Text>
          </View>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>Data</Text>
            <Text style={styles.metaVal}>{formatDateBR(quote.created_at)}</Text>
          </View>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>Cliente</Text>
            <Text style={styles.metaVal}>{quote.customer_name}</Text>
          </View>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>Contato</Text>
            <Text style={styles.metaVal}>{quote.customer_phone}</Text>
          </View>
        </View>

        {/* Table */}
        <Text style={styles.sectionTitle}>Itens Solicitados</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colNum}>#</Text>
            <Text style={styles.colItem}>Produto / Variação</Text>
            <Text style={styles.colCode}>Cód. Ref.</Text>
            <Text style={styles.colQty}>Qtd / Un.</Text>
            <Text style={styles.colPrice}>Ref. Un.</Text>
          </View>

          {items.map((item, idx) => (
            <View
              key={item.id || idx}
              style={[styles.tableRow, idx % 2 === 1 ? styles.tableRowAlt : {}]}
            >
              <Text style={styles.colNum}>{idx + 1}</Text>
              <View style={styles.colItem}>
                <Text style={{ fontFamily: 'Helvetica', fontWeight: 'bold' }}>
                  {item.product_name_snapshot}
                </Text>
                {item.variant_snapshot && (
                  <Text style={{ fontSize: 8, color: '#6C747A' }}>
                    {item.variant_snapshot}
                  </Text>
                )}
                {item.customer_note && (
                  <Text style={{ fontSize: 8, color: '#A56400', marginTop: 1 }}>
                    Obs: {item.customer_note}
                  </Text>
                )}
              </View>
              <Text style={styles.colCode}>
                {item.public_code_snapshot || '-'}
              </Text>
              <Text style={styles.colQty}>
                {item.quantity} {item.unit_snapshot}
              </Text>
              <Text style={styles.colPrice}>
                {item.price_mode_snapshot === 'EXACT' &&
                item.public_unit_price_snapshot !== null
                  ? formatCurrency(item.public_unit_price_snapshot)
                  : 'A confirmar'}
              </Text>
            </View>
          ))}
        </View>

        {/* Total Box */}
        <View style={styles.totalBox}>
          <View style={styles.totalInner}>
            <Text style={styles.totalLabel}>Estimativa Total</Text>
            <Text style={styles.totalVal}>
              {!hasHiddenPrice && quote.public_total_estimate
                ? formatCurrency(quote.public_total_estimate)
                : 'VALORES A CONFIRMAR'}
            </Text>
          </View>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerTitle}>AVISO IMPORTANTE SOBRE ESTE DOCUMENTO</Text>
          <Text style={styles.disclaimerText}>
            Esta é uma solicitação de orçamento e NÃO representa nota fiscal, comprovante de venda,
            garantia de preço ou reserva de estoque. Preços, disponibilidade, prazos, taxas de entrega e
            compatibilidade dos produtos serão confirmados pela equipe da Ferragens Martins no momento do atendimento.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            Ferragens Martins — Vila São Vicente: (41) 9 9255-7256 | Vila Itiberê: (41) 9 8900-1321
          </Text>
          <Text style={{ marginTop: 2 }}>
            Atendimento: Segunda a Sexta das 08h às 18h | Sábado das 08h às 12h — Paranaguá - PR
          </Text>
        </View>
      </Page>
    </Document>
  )
}

/**
 * Generate PDF buffer for quote document on server runtime
 */
export async function generateQuotePDFBuffer(quote: Quote, items: QuoteItem[]): Promise<Buffer> {
  const element = <QuotePDFDocument quote={quote} items={items} />
  const buffer = await renderToBuffer(element)
  return buffer
}

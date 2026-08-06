'use client'

import React, { useState } from 'react'
import styles from './CsvImportWizard.module.css'

interface CsvImportWizardProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

const TARGET_FIELDS = [
  { key: 'name', label: 'Nome do Produto *', required: true },
  { key: 'public_code', label: 'Código / SKU', required: false },
  { key: 'category', label: 'Categoria', required: false },
  { key: 'brand', label: 'Marca', required: false },
  { key: 'price_mode', label: 'Modo de Preço (EXACT, FROM, HIDDEN, ON_REQUEST)', required: false },
  { key: 'public_price', label: 'Preço Público (R$)', required: false },
  { key: 'short_description', label: 'Descrição Curta', required: false },
  { key: 'unit', label: 'Unidade (UN, KG, M, CX, etc.)', required: false },
]

export const CsvImportWizard: React.FC<CsvImportWizardProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [headers, setHeaders] = useState<string[]>([])
  const [rows, setRows] = useState<string[][]>([])
  const [mapping, setMapping] = useState<Record<string, string>>({})
  const [validatedData, setValidatedData] = useState<
    { data: Record<string, any>; errors: string[] }[]
  >([])
  const [progress, setProgress] = useState<number>(0)
  const [importResult, setImportResult] = useState<{ successCount: number; failCount: number }>({
    successCount: 0,
    failCount: 0,
  })

  if (!isOpen) return null

  // Step 1: Parse CSV
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (evt) => {
      const text = evt.target?.result as string

      const lines = text
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0)
      if (lines.length > 0) {
        const firstLine = lines[0]
        const delimiter = firstLine.includes(';') ? ';' : ','
        const parsedHeaders = firstLine.split(delimiter).map((h) => h.replace(/^["']|["']$/g, '').trim())
        const parsedRows = lines.slice(1).map((l) =>
          l.split(delimiter).map((val) => val.replace(/^["']|["']$/g, '').trim()),
        )

        setHeaders(parsedHeaders)
        setRows(parsedRows)

        // Auto-match headers to target fields
        const autoMap: Record<string, string> = {}
        TARGET_FIELDS.forEach((tf) => {
          const match = parsedHeaders.find(
            (h) => h.toLowerCase().includes(tf.key) || h.toLowerCase().includes(tf.label.toLowerCase()),
          )
          if (match) {
            autoMap[tf.key] = match
          }
        })
        setMapping(autoMap)
        setStep(2)
      }
    }
    reader.readAsText(file)
  }

  // Step 2 -> 3: Generate validation preview
  const handleGeneratePreview = () => {
    const parsed: { data: Record<string, any>; errors: string[] }[] = []

    rows.forEach((row) => {
      const rowData: Record<string, any> = {}
      const errors: string[] = []

      TARGET_FIELDS.forEach((tf) => {
        const headerName = mapping[tf.key]
        if (headerName) {
          const index = headers.indexOf(headerName)
          if (index !== -1) {
            rowData[tf.key] = row[index]
          }
        }
      })

      if (!rowData.name || rowData.name.trim() === '') {
        errors.push('Nome do produto é obrigatório.')
      }

      parsed.push({ data: rowData, errors })
    })

    setValidatedData(parsed)
    setStep(3)
  }

  // Step 3 -> 4 -> 5: Perform mock or real import
  const handleStartImport = async () => {
    setStep(4)
    let success = 0
    let fail = 0

    for (let i = 0; i < validatedData.length; i++) {
      const item = validatedData[i]
      if (item.errors.length === 0) {
        success++
      } else {
        fail++
      }
      setProgress(Math.round(((i + 1) / validatedData.length) * 100))
      await new Promise((res) => setTimeout(res, 50))
    }

    setImportResult({ successCount: success, failCount: fail })
    setStep(5)
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>Importar Produtos via CSV</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>

        <div className={styles.stepsHeader}>
          <div className={`${styles.stepItem} ${step === 1 ? styles.stepActive : step > 1 ? styles.stepDone : ''}`}>
            1. Enviar CSV
          </div>
          <div className={`${styles.stepItem} ${step === 2 ? styles.stepActive : step > 2 ? styles.stepDone : ''}`}>
            2. Mapear Colunas
          </div>
          <div className={`${styles.stepItem} ${step === 3 ? styles.stepActive : step > 3 ? styles.stepDone : ''}`}>
            3. Pré-visualização
          </div>
          <div className={`${styles.stepItem} ${step === 4 ? styles.stepActive : step > 4 ? styles.stepDone : ''}`}>
            4. Importação
          </div>
          <div className={`${styles.stepItem} ${step === 5 ? styles.stepActive : ''}`}>
            5. Resultado
          </div>
        </div>

        <div className={styles.body}>
          {step === 1 && (
            <div>
              <p>Selecione um arquivo CSV contendo os produtos a importar.</p>
              <input type="file" accept=".csv,text/csv" onChange={handleFileUpload} style={{ marginTop: '1rem' }} />
            </div>
          )}

          {step === 2 && (
            <div>
              <p>Associe as colunas do seu arquivo CSV aos campos do sistema:</p>
              <table className={styles.mappingTable}>
                <thead>
                  <tr>
                    <th>Campo do Sistema</th>
                    <th>Coluna no CSV</th>
                  </tr>
                </thead>
                <tbody>
                  {TARGET_FIELDS.map((tf) => (
                    <tr key={tf.key}>
                      <td>
                        <strong>{tf.label}</strong>
                      </td>
                      <td>
                        <select
                          className={styles.select}
                          value={mapping[tf.key] || ''}
                          onChange={(e) =>
                            setMapping({ ...mapping, [tf.key]: e.target.value })
                          }
                        >
                          <option value="">-- Não mapeado --</option>
                          {headers.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {step === 3 && (
            <div>
              <p>Confira a pré-visualização dos primeiros registros a serem importados:</p>
              <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
                <table className={styles.previewTable}>
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Nome</th>
                      <th>Código</th>
                      <th>Preço</th>
                      <th>Erros</th>
                    </tr>
                  </thead>
                  <tbody>
                    {validatedData.slice(0, 10).map((row, idx) => (
                      <tr key={idx}>
                        <td>{row.errors.length === 0 ? '✅ Válido' : '⚠️ Erro'}</td>
                        <td>{row.data.name || '-'}</td>
                        <td>{row.data.public_code || '-'}</td>
                        <td>{row.data.public_price || '-'}</td>
                        <td className={styles.errorText}>
                          {row.errors.join(', ')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.5rem' }}>
                Total de linhas encontradas: {validatedData.length}
              </p>
            </div>
          )}

          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <h4>Importando produtos...</h4>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
              <p>{progress}% concluído</p>
            </div>
          )}

          {step === 5 && (
            <div className={styles.summaryBox}>
              <h4>Importação Finalizada!</h4>
              <p style={{ marginTop: '0.5rem' }}>
                - Sucesso: <strong>{importResult.successCount}</strong> produtos<br />
                - Falhas/Erros: <strong>{importResult.failCount}</strong> produtos
              </p>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          {step > 1 && step < 4 && (
            <button
              className={styles.btnSecondary}
              onClick={() => setStep((s) => (s - 1) as any)}
            >
              Voltar
            </button>
          )}
          <div style={{ marginLeft: 'auto' }}>
            {step === 2 && (
              <button className={styles.btnPrimary} onClick={handleGeneratePreview}>
                Avançar para Pré-visualização
              </button>
            )}
            {step === 3 && (
              <button className={styles.btnPrimary} onClick={handleStartImport}>
                Confirmar e Importar
              </button>
            )}
            {step === 5 && (
              <button
                className={styles.btnPrimary}
                onClick={() => {
                  onComplete()
                  onClose()
                }}
              >
                Concluir
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

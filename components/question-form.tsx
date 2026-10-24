'use client'

import { useMemo, useState } from 'react'
import { Loader2, Plus, X } from 'lucide-react'

import { QUESTION_PACKAGE_OPTIONS } from '@/data/question-management'
import { PROGRAM_CATALOG, SUBTEST_BY_ID } from '@/lib/exam-package-catalog'
import type { ProgramId, SubtestCode } from '@/types/exam-package'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RichTextEditor } from './rich-text-editor'

const DIFFICULTY_LEVELS = [
  { label: 'Mudah', value: 'easy' },
  { label: 'Sedang', value: 'medium' },
  { label: 'Sulit', value: 'hard' },
]

interface QuestionFormData {
  programId: ProgramId | ''
  packageId: string
  subtestId: SubtestCode | ''
  difficulty: string
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  timeLimit: string
  tags: string[]
  currentTag: string
}

const createInitialForm = (): QuestionFormData => ({
  programId: '',
  packageId: '',
  subtestId: '',
  difficulty: '',
  question: '',
  options: ['', '', '', '', ''],
  correctAnswer: '',
  explanation: '',
  timeLimit: '60',
  tags: [],
  currentTag: '',
})

export function QuestionForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [formData, setFormData] = useState<QuestionFormData>(createInitialForm())

  const availablePackages = useMemo(
    () => QUESTION_PACKAGE_OPTIONS.filter((pkg) => pkg.programId === formData.programId),
    [formData.programId],
  )

  const selectedPackage = useMemo(
    () => availablePackages.find((pkg) => pkg.id === formData.packageId) ?? null,
    [availablePackages, formData.packageId],
  )

  const availableSubtests = useMemo(() => {
    if (!selectedPackage) return []
    return selectedPackage.subtestIds.map((subtestId) => SUBTEST_BY_ID[subtestId])
  }, [selectedPackage])

  const safeTimeLimit = Number.parseInt(formData.timeLimit, 10)
  const timeLimitValue = Number.isNaN(safeTimeLimit) ? 0 : safeTimeLimit

  const updateOption = (index: number, value: string) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData({ ...formData, options: newOptions })
  }

  const addTag = () => {
    const nextTag = formData.currentTag.trim()
    if (nextTag && !formData.tags.includes(nextTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, nextTag],
        currentTag: '',
      })
    }
  }

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((item) => item !== tag),
    })
  }

  const setProgram = (value: ProgramId) => {
    setFormData((previous) => ({
      ...previous,
      programId: value,
      packageId: '',
      subtestId: '',
    }))
  }

  const setPackage = (value: string) => {
    const packageData = QUESTION_PACKAGE_OPTIONS.find((pkg) => pkg.id === value)
    setFormData((previous) => ({
      ...previous,
      packageId: value,
      subtestId: packageData?.subtestIds[0] ?? '',
    }))
  }

  const handleSaveDraft = async () => {
    if (!formData.programId || !formData.packageId || !formData.subtestId) {
      alert('Pilih program, paket, dan subtest terlebih dahulu.')
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccessMessage('Draft soal tersimpan pada flow Program - Paket - Subtest.')
      setTimeout(() => setSuccessMessage(''), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePublish = async () => {
    const hasEmptyOption = formData.options.some((option) => !option.trim())

    if (
      !formData.programId ||
      !formData.packageId ||
      !formData.subtestId ||
      !formData.difficulty ||
      !formData.question ||
      !formData.correctAnswer ||
      hasEmptyOption
    ) {
      alert('Harap lengkapi semua bidang yang diperlukan.')
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccessMessage('Soal berhasil dipublikasikan pada program yang dipilih.')
      setTimeout(() => {
        setSuccessMessage('')
        setFormData(createInitialForm())
      }, 1800)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetForm = () => {
    if (confirm('Apakah Anda yakin ingin mengosongkan form ini?')) {
      setFormData(createInitialForm())
    }
  }

  return (
    <div className="space-y-6">
      {successMessage && (
        <div className="animate-in fade-in rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800">
          {successMessage}
        </div>
      )}

      <Card className="border-border bg-secondary/20 p-4">
        <p className="text-sm font-semibold text-foreground">Flow Input Soal</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Pilih urutan berikut: Program - Paket - Subtest, lalu isi detail soal.
        </p>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Program <span className="text-destructive">*</span>
          </label>
          <Select value={formData.programId || undefined} onValueChange={(value) => setProgram(value as ProgramId)}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Pilih program" />
            </SelectTrigger>
            <SelectContent>
              {PROGRAM_CATALOG.map((program) => (
                <SelectItem key={program.id} value={program.id}>
                  {program.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Paket <span className="text-destructive">*</span>
          </label>
          <Select
            value={formData.packageId || undefined}
            onValueChange={setPackage}
            disabled={!formData.programId || availablePackages.length === 0}
          >
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Pilih paket" />
            </SelectTrigger>
            <SelectContent>
              {availablePackages.map((pkg) => (
                <SelectItem key={pkg.id} value={pkg.id}>
                  {pkg.code} - {pkg.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Subtest <span className="text-destructive">*</span>
          </label>
          <Select
            value={formData.subtestId || undefined}
            onValueChange={(value) => setFormData({ ...formData, subtestId: value as SubtestCode })}
            disabled={!selectedPackage}
          >
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Pilih subtest" />
            </SelectTrigger>
            <SelectContent>
              {availableSubtests.map((subtest) => (
                <SelectItem key={subtest.id} value={subtest.id}>
                  {subtest.code} - {subtest.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Tingkat Kesulitan <span className="text-destructive">*</span>
        </label>
        <RadioGroup value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
          <div className="flex gap-6">
            {DIFFICULTY_LEVELS.map((level) => (
              <div key={level.value} className="flex items-center space-x-2">
                <RadioGroupItem value={level.value} id={level.value} />
                <label htmlFor={level.value} className="cursor-pointer text-sm text-foreground">
                  {level.label}
                </label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <RichTextEditor
        label="Soal"
        value={formData.question}
        onChange={(value) => setFormData({ ...formData, question: value })}
        placeholder="Tuliskan soal di sini. Gunakan toolbar untuk format teks, gambar, atau rumus matematika..."
      />

      <Card className="border-border bg-card p-6">
        <h3 className="mb-6 text-lg font-semibold text-foreground">Opsi Jawaban</h3>

        <RadioGroup value={formData.correctAnswer} onValueChange={(value) => setFormData({ ...formData, correctAnswer: value })}>
          <div className="space-y-4">
            {formData.options.map((option, index) => {
              const optionLabel = String.fromCharCode(65 + index)
              return (
                <div key={optionLabel} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={optionLabel} id={`answer-${index}`} className="cursor-pointer" />
                    <label htmlFor={`answer-${index}`} className="cursor-pointer font-medium text-foreground">
                      {optionLabel}
                    </label>
                  </div>
                  <Input
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Masukkan opsi jawaban ${optionLabel}...`}
                    className="ml-7 border-border bg-background text-foreground"
                  />
                </div>
              )
            })}
          </div>
        </RadioGroup>

        {formData.correctAnswer && (
          <div className="mt-6 border-t border-border pt-4">
            <p className="text-sm text-muted-foreground">
              Kunci Jawaban: <span className="font-bold text-primary">{formData.correctAnswer}</span>
            </p>
          </div>
        )}
      </Card>

      <RichTextEditor
        label="Pembahasan"
        value={formData.explanation}
        onChange={(value) => setFormData({ ...formData, explanation: value })}
        placeholder="Jelaskan jawaban yang benar dan berikan pembahasan yang terstruktur..."
        minHeight="min-h-40"
      />

      <div className="space-y-2">
        <label htmlFor="timeLimit" className="block text-sm font-medium text-foreground">
          Batas Waktu per Soal (detik)
        </label>
        <div className="flex items-center gap-2">
          <Input
            id="timeLimit"
            type="number"
            min="10"
            max="300"
            value={formData.timeLimit}
            onChange={(e) => setFormData({ ...formData, timeLimit: e.target.value })}
            className="max-w-32 border-border bg-card text-foreground"
          />
          <span className="text-sm text-muted-foreground">
            ({Math.floor(timeLimitValue / 60)}m {timeLimitValue % 60}s)
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">Tag / Keyword</label>
        <div className="flex gap-2">
          <Input
            value={formData.currentTag}
            onChange={(e) => setFormData({ ...formData, currentTag: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTag()
              }
            }}
            placeholder="Masukkan tag dan tekan Enter..."
            className="flex-1 border-border bg-card text-foreground"
          />
          <Button onClick={addTag} variant="outline" className="gap-2 bg-transparent">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Tambah</span>
          </Button>
        </div>

        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {formData.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-2 pl-3">
                {tag}
                <button onClick={() => removeTag(tag)} className="ml-1 hover:text-foreground">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
        <Button onClick={handleResetForm} variant="outline" className="flex-1 bg-transparent">
          Reset Form
        </Button>
        <Button onClick={handleSaveDraft} variant="secondary" disabled={isLoading} className="flex-1 gap-2">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          Simpan Draft
        </Button>
        <Button onClick={handlePublish} disabled={isLoading} className="flex-1 gap-2">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          Publikasikan
        </Button>
      </div>
    </div>
  )
}

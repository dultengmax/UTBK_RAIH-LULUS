'use client'

import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { RichTextEditor } from './rich-text-editor'
import { Badge } from '@/components/ui/badge'
import { Loader2, Plus, X } from 'lucide-react'
import { SUBTEST_CATALOG } from '@/lib/exam-package-catalog'

const CATEGORIES = SUBTEST_CATALOG.map((subtest) => subtest.name)

const DIFFICULTY_LEVELS = [
  { label: 'Mudah', value: 'easy' },
  { label: 'Sedang', value: 'medium' },
  { label: 'Sulit', value: 'hard' },
]

interface QuestionFormData {
  category: string
  difficulty: string
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  timeLimit: string
  tags: string[]
  currentTag: string
}

export function QuestionForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [formData, setFormData] = useState<QuestionFormData>({
    category: '',
    difficulty: '',
    question: '',
    options: ['', '', '', '', ''],
    correctAnswer: '',
    explanation: '',
    timeLimit: '60',
    tags: [],
    currentTag: '',
  })

  const updateOption = (index: number, value: string) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData({ ...formData, options: newOptions })
  }

  const addTag = () => {
    if (formData.currentTag.trim() && !formData.tags.includes(formData.currentTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.currentTag],
        currentTag: '',
      })
    }
  }

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag),
    })
  }

  const handleSaveDraft = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccessMessage('Draft tersimpan berhasil!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePublish = async () => {
    if (!formData.category || !formData.difficulty || !formData.question) {
      alert('Harap lengkapi semua bidang yang diperlukan')
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccessMessage('Soal berhasil dipublikasikan!')
      setTimeout(() => {
        setSuccessMessage('')
        // Reset form
        setFormData({
          category: '',
          difficulty: '',
          question: '',
          options: ['', '', '', '', ''],
          correctAnswer: '',
          explanation: '',
          timeLimit: '60',
          tags: [],
          currentTag: '',
        })
      }, 2000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetForm = () => {
    if (confirm('Apakah Anda yakin ingin mengosongkan form ini?')) {
      setFormData({
        category: '',
        difficulty: '',
        question: '',
        options: ['', '', '', '', ''],
        correctAnswer: '',
        explanation: '',
        timeLimit: '60',
        tags: [],
        currentTag: '',
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg animate-in fade-in">
          ✓ {successMessage}
        </div>
      )}

      {/* Category and Difficulty */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Pilih Kategori / Subtes <span className="text-destructive">*</span>
          </label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Pilih kategori soal" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Pilih Tingkat Kesulitan <span className="text-destructive">*</span>
          </label>
          <RadioGroup value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
            <div className="flex gap-6">
              {DIFFICULTY_LEVELS.map((level) => (
                <div key={level.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={level.value} id={level.value} />
                  <label htmlFor={level.value} className="text-sm cursor-pointer text-foreground">
                    {level.label}
                  </label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Question Text */}
      <RichTextEditor
        label="Soal"
        value={formData.question}
        onChange={(value) => setFormData({ ...formData, question: value })}
        placeholder="Tuliskan soal di sini. Gunakan toolbar untuk format teks, menambahkan gambar, atau rumus matematika..."
      />

      {/* Answer Options */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-6">Opsi Jawaban</h3>

        <RadioGroup value={formData.correctAnswer} onValueChange={(value) => setFormData({ ...formData, correctAnswer: value })}>
          <div className="space-y-4">
            {formData.options.map((option, index) => {
              const optionLabel = String.fromCharCode(65 + index) // A, B, C, D, E
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem
                      value={optionLabel}
                      id={`answer-${index}`}
                      className="cursor-pointer"
                    />
                    <label htmlFor={`answer-${index}`} className="font-medium text-foreground cursor-pointer">
                      {optionLabel}
                    </label>
                  </div>
                  <Input
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Masukkan opsi jawaban ${optionLabel}...`}
                    className="ml-7 bg-background border-border text-foreground"
                  />
                </div>
              )
            })}
          </div>
        </RadioGroup>

        {formData.correctAnswer && (
          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Kunci Jawaban: <span className="font-bold text-primary">{formData.correctAnswer}</span>
            </p>
          </div>
        )}
      </Card>

      {/* Explanation */}
      <RichTextEditor
        label="Pembahasan"
        value={formData.explanation}
        onChange={(value) => setFormData({ ...formData, explanation: value })}
        placeholder="Jelaskan jawaban yang benar dan berikan pembahasan mendalam untuk membantu pemelajar..."
        minHeight="min-h-40"
      />

      {/* Time Limit */}
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
            className="max-w-32 bg-card border-border text-foreground"
          />
          <span className="text-sm text-muted-foreground">
            ({Math.floor(parseInt(formData.timeLimit) / 60)}m {parseInt(formData.timeLimit) % 60}s)
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          Tag / Keyword
        </label>
        <div className="flex gap-2">
          <Input
            value={formData.currentTag}
            onChange={(e) => setFormData({ ...formData, currentTag: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="Masukkan tag dan tekan Enter..."
            className="bg-card border-border text-foreground flex-1"
          />
          <Button onClick={addTag} variant="outline" className="gap-2 bg-transparent">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Tambah</span>
          </Button>
        </div>

        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {formData.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-2 pl-3">
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:text-foreground"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
        <Button
          onClick={handleResetForm}
          variant="outline"
          className="flex-1 bg-transparent"
        >
          Reset Form
        </Button>
        <Button
          onClick={handleSaveDraft}
          variant="secondary"
          disabled={isLoading}
          className="flex-1 gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Simpan Draft
        </Button>
        <Button
          onClick={handlePublish}
          disabled={isLoading}
          className="flex-1 gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Publikasikan
        </Button>
      </div>
    </div>
  )
}

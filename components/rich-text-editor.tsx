'use client'

import { useState } from 'react'
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Superscript,
  Subscript,
  Plus,
  ImageIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
  label?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Masukkan teks di sini...',
  minHeight = 'min-h-48',
  label,
}: RichTextEditorProps) {
  const [isFocused, setIsFocused] = useState(false)

  const applyFormat = (format: string, value?: string) => {
    const textarea = document.activeElement as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value ? value : textarea.value.substring(start, end)
    const beforeText = textarea.value.substring(0, start)
    const afterText = textarea.value.substring(end)

    let newText = ''
    let newCursorPos = start

    switch (format) {
      case 'bold':
        newText = `${beforeText}**${selectedText || 'teks'}**${afterText}`
        newCursorPos = start + selectedText.length + 4
        break
      case 'italic':
        newText = `${beforeText}_${selectedText || 'teks'}_${afterText}`
        newCursorPos = start + selectedText.length + 2
        break
      case 'underline':
        newText = `${beforeText}<u>${selectedText || 'teks'}</u>${afterText}`
        newCursorPos = start + selectedText.length + 3
        break
      case 'bullet':
        newText = `${beforeText}\n• ${selectedText || 'item'}${afterText}`
        break
      case 'number':
        newText = `${beforeText}\n1. ${selectedText || 'item'}${afterText}`
        break
      case 'superscript':
        newText = `${beforeText}<sup>${selectedText || 'teks'}</sup>${afterText}`
        break
      case 'subscript':
        newText = `${beforeText}<sub>${selectedText || 'teks'}</sub>${afterText}`
        break
      default:
        return
    }

    onChange(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const handleAddMedia = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e: any) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string
          onChange(value + `\n[Gambar: ${file.name}]\n`)
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-foreground">{label}</label>}

      <div
        className={cn(
          'border rounded-lg overflow-hidden transition-colors',
          isFocused ? 'border-ring bg-card' : 'border-border bg-card'
        )}
      >
        {/* Toolbar */}
        <div className="bg-muted border-b border-border p-3 flex flex-wrap gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => applyFormat('bold')}
            title="Bold (Ctrl+B)"
            className="hover:bg-secondary"
          >
            <Bold className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => applyFormat('italic')}
            title="Italic (Ctrl+I)"
            className="hover:bg-secondary"
          >
            <Italic className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => applyFormat('underline')}
            title="Underline"
            className="hover:bg-secondary"
          >
            <Underline className="w-4 h-4" />
          </Button>

          <div className="w-px bg-border mx-2" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => applyFormat('bullet')}
            title="Bullet List"
            className="hover:bg-secondary"
          >
            <List className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => applyFormat('number')}
            title="Numbered List"
            className="hover:bg-secondary"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>

          <div className="w-px bg-border mx-2" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => applyFormat('superscript')}
            title="Superscript"
            className="hover:bg-secondary"
          >
            <Superscript className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => applyFormat('subscript')}
            title="Subscript"
            className="hover:bg-secondary"
          >
            <Subscript className="w-4 h-4" />
          </Button>

          <div className="w-px bg-border mx-2" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAddMedia}
            title="Insert Image"
            className="hover:bg-secondary"
          >
            <ImageIcon className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            title="Insert Math Equation"
            className="hover:bg-secondary text-xs"
          >
            <Plus className="w-4 h-4" />
            <span className="ml-1 hidden sm:inline">∑</span>
          </Button>
        </div>

        {/* Editor */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            'w-full bg-card text-foreground p-4 resize-none focus:outline-none',
            minHeight
          )}
        />
      </div>

      {/* Character count */}
      <div className="flex justify-end text-xs text-muted-foreground">
        {value.length} karakter
      </div>
    </div>
  )
}

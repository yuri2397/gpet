import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer"
      [class.border-primary]="isDragging()"
      [class.bg-primary/5]="isDragging()"
      [class.border-gray-300]="!isDragging()"
      [class.hover:border-gray-400]="!isDragging()"
      (dragover)="onDragOver($event)"
      (dragleave)="isDragging.set(false)"
      (drop)="onDrop($event)"
      (click)="fileInput.click()"
    >
      <input
        #fileInput
        type="file"
        class="hidden"
        [accept]="accept()"
        [multiple]="multiple()"
        (change)="onFileSelected($event)"
      />
      <i class="fa-solid fa-cloud-arrow-up text-3xl text-gray-400 mb-2"></i>
      <p class="text-sm text-gray-600">
        Cliquez ou glissez un fichier ici
      </p>
      @if (hint()) {
        <p class="text-xs text-gray-400 mt-1">{{ hint() }}</p>
      }
    </div>

    @if (files().length > 0) {
      <div class="mt-3 space-y-2">
        @for (file of files(); track file.name) {
          <div class="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg text-sm">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-file text-gray-400"></i>
              <span class="text-gray-700">{{ file.name }}</span>
            </div>
            <button
              (click)="removeFile(file)"
              class="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        }
      </div>
    }
  `,
})
export class FileUploadComponent {
  accept = input<string>('');
  multiple = input(false);
  hint = input<string>('');

  fileChange = output<File[]>();

  isDragging = signal(false);
  files = signal<File[]>([]);

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
    const files = Array.from(event.dataTransfer?.files ?? []);
    this.addFiles(files);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    this.addFiles(files);
    input.value = '';
  }

  removeFile(file: File) {
    this.files.update((list) => list.filter((f) => f !== file));
    this.fileChange.emit(this.files());
  }

  private addFiles(newFiles: File[]) {
    if (this.multiple()) {
      this.files.update((list) => [...list, ...newFiles]);
    } else {
      this.files.set(newFiles.slice(0, 1));
    }
    this.fileChange.emit(this.files());
  }
}

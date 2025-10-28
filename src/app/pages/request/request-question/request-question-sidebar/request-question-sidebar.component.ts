import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SidebarItem {
  id: string | number;
  title: string;
}

@Component({
  selector: 'app-request-question-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sidebar-container flex flex-col gap-1 border-r-[1px] border-r-[#E5E5E5]">
      @for (item of items(); track item.id) {
        <div
          [class]="getItemClasses(item)"
        >
          {{ item.title }}
        </div>
      }
    </div>
  `,
  styleUrl: './request-question-sidebar.component.scss',
})
export class RequestQuestionSidebarComponent {
  items = input.required<SidebarItem[]>();
  activeItemId = input<string | null>(null);

  isActive(item: SidebarItem): boolean {
    return this.activeItemId() === item.id;
  }

  getItemClasses(item: SidebarItem): string {
    const baseClasses = 'py-2 px-2 h-[40px] flex items-center cursor-pointer transition-colors duration-200 text-sm rounded-tl-lg rounded-bl-lg mr-[-1px]';
    
    if (this.isActive(item)) {
      return `${baseClasses} bg-primary-most-light text-primary border-r-2 border-primary font-semibold`;
    }
    
    return `${baseClasses} bg-transparent text-black border-r-[1px] border-r-[#E5E5E5] font-medium`;
  }
}


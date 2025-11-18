// loader.component.ts
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="loader"></div>`,
  styles: [
    `
      .loader {
        border: 6px solid #f3f3f3;
        border-top: 6px solid #ff9800;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        margin: 2rem auto;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoaderComponent {}

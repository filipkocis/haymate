import { SvgProps } from "./types";
import { cn } from "/src/lib/utils";

export default function UnicornIcon({ stroke, fill, className, size, width, height }: SvgProps) {
  return (
    <svg height={height ?? size ?? 24} width={width ?? size ?? 24} version="1.1" viewBox="-51.2 -51.2 614.40 614.40" fill={fill ?? "currentColor" } stroke={stroke ?? "currentColor"} stroke-width="15.36" className={cn(className)}>
      <g> 
        <g> 
          <path fill="currentColor" d={"M496.8,259.911l-77.223-66.833l41.836-108.796v-0.008c0.61-1.566,0.9-3.212,0.9-4.834 c0.008-4.536-2.313-8.921-6.36-11.442c-2.184-1.373-4.69-2.048-7.13-2.048c-3.646,0-7.275,1.493-9.901,4.336l-71.674,77.497 L346.28,129.65l-17.626-44.662c-2.457-6.231-8.191-10.559-14.839-11.209c-0.627-0.057-1.213-0.089-1.766-0.089 c-6.039,0-11.7,3.06-15.008,8.199l-0.594,0.923L256.98,144.2l-0.875-2.144c-16.381,6.745-30.947,9.635-44.093,13.45 c-6.568,1.927-12.831,4.088-18.669,7.299c-5.838,3.196-11.226,7.516-15.634,13.378c-2.497,3.292-4.264,6.769-5.356,10.23 c-1.084,3.452-1.486,6.873-1.486,10.069c0.025,5.452,1.1,10.295,2,14.63c0.923,4.344,1.678,8.174,1.662,11.466 c0,1.951-0.233,3.718-0.779,5.469c-0.554,1.774-1.429,3.557-2.954,5.581c-1.414,1.855-2.771,3.116-4.152,4.063 c-2.393,1.638-4.987,2.473-8.335,2.955c-2.497,0.361-5.34,0.482-8.464,0.618c-4.666,0.217-10.005,0.41-15.658,2.192 c-2.818,0.891-5.693,2.232-8.423,4.127c-2.738,1.896-5.292,4.352-7.564,7.372c-2.505,3.301-4.28,6.77-5.356,10.231 c-1.084,3.452-1.493,6.873-1.486,10.069c0.008,5.46,1.093,10.294,1.992,14.639c0.932,4.344,1.678,8.158,1.662,11.466 c0,1.943-0.225,3.702-0.779,5.468c-0.562,1.759-1.438,3.557-2.954,5.565c-1.397,1.862-2.77,3.116-4.136,4.071 c-2.393,1.622-4.994,2.457-8.334,2.955c-2.497,0.353-5.348,0.474-8.472,0.602c-4.666,0.232-9.997,0.409-15.65,2.192 c-2.818,0.9-5.701,2.232-8.423,4.128c-2.73,1.895-5.292,4.352-7.556,7.372c-2.521,3.3-4.28,6.769-5.355,10.23 c-1.085,3.452-1.494,6.858-1.486,10.061c0.008,5.452,1.084,10.303,1.992,14.647c0.923,4.336,1.686,8.166,1.662,11.458 c0,1.951-0.224,3.71-0.778,5.476c-0.563,1.75-1.438,3.55-2.947,5.557c-2.907,3.831-6.271,6.296-10.366,8.512 c-3.068,1.646-6.512,3.067-10.19,4.641c-5.484,2.394-11.611,5.124-17.112,10.182c-2.738,2.514-5.251,5.605-7.307,9.299 c-2.048,3.702-3.646,7.99-4.738,12.928L0,446.051h62.93h8.094h5.982h236.809l38.487-97.338l84.41,16.758 c3.092,0.666,6.215,1.003,9.306,1.003c13.66,0,26.764-6.376,35.187-17.593l21.994-29.342c5.91-7.869,8.801-17.175,8.801-26.362 C512,280.836,506.805,268.558,496.8,259.911z M443.562,87.887l-36.335,94.503l-28.362-24.538L443.562,87.887z M71.024,433.46v-2.77 H20.629c1.734-2.923,3.734-4.986,6.206-6.794c2.144-1.542,4.666-2.874,7.524-4.184c4.288-1.975,9.33-3.838,14.566-6.649 c5.212-2.81,10.656-6.728,15.12-12.654c2.506-3.3,4.272-6.77,5.348-10.23c1.092-3.453,1.502-6.874,1.486-10.07 c-0.008-5.46-1.092-10.294-1.983-14.638c-0.94-4.336-1.687-8.166-1.678-11.467c0.008-1.943,0.233-3.702,0.779-5.468 c0.562-1.759,1.446-3.55,2.955-5.557c1.405-1.87,2.778-3.124,4.152-4.071c2.376-1.638,4.978-2.465,8.334-2.947 c2.49-0.369,5.34-0.49,8.456-0.626c4.673-0.216,10.004-0.401,15.666-2.184c2.819-0.9,5.693-2.224,8.416-4.12 c2.738-1.902,5.299-4.36,7.564-7.371c2.513-3.308,4.263-6.777,5.348-10.238c1.092-3.453,1.485-6.865,1.485-10.061 c-0.007-5.461-1.084-10.302-1.983-14.639c-0.924-4.344-1.686-8.174-1.67-11.466c0-1.951,0.224-3.71,0.778-5.469 c0.554-1.758,1.438-3.549,2.955-5.572c1.406-1.855,2.77-3.107,4.152-4.063c2.393-1.639,4.986-2.465,8.335-2.955 c2.498-0.362,5.34-0.482,8.464-0.618c4.665-0.224,9.997-0.418,15.658-2.184c2.818-0.908,5.692-2.232,8.415-4.136 c2.746-1.894,5.3-4.352,7.572-7.37c2.505-3.309,4.28-6.77,5.356-10.231c1.092-3.469,1.493-6.873,1.493-10.078 c-0.016-5.46-1.108-10.302-2-14.638c-0.931-4.328-1.678-8.159-1.654-11.459c0-1.951,0.224-3.71,0.779-5.476 c0.554-1.759,1.429-3.557,2.947-5.565c3.035-4.007,6.48-6.793,10.784-9.178c6.416-3.566,14.927-5.958,25.294-8.664 c5.902-1.55,12.398-3.244,19.368-5.42L71.024,433.46z M490.914,310.33l-22.01,29.333c-5.476,7.299-14.004,11.442-22.885,11.442 c-2.047,0-4.111-0.217-6.167-0.658l-0.08-0.032l-97.042-19.272l-39.362,99.546H91.074L309.985,90.175 c0.458-0.706,1.245-1.124,2.064-1.124l0.184,0.007h0.064c0.932,0.097,1.718,0.699,2.064,1.566l19.015,48.18l153.371,132.717 c6.52,5.645,9.884,13.594,9.884,21.657C496.631,299.177,494.776,305.167,490.914,310.33z"}
          /> 
          <path fill={fill ?? "currentColor" } d="M350.07,221.287c-9.427,0-17.072,7.644-17.072,17.064c0,9.443,7.644,17.079,17.072,17.079 c9.435,0,17.079-7.636,17.079-17.079C367.149,228.931,359.505,221.287,350.07,221.287z"/> 
          <polygon fill={fill ?? "currentColor" } points="455.944,67.988 455.952,67.996 455.952,67.996 "/> 
          <path fill={fill ?? "currentColor" } d="M455.968,67.996c0,0-0.008,0-0.016,0l0.144,0.096L455.968,67.996z"/> 
        </g>
      </g>
    </svg>
  )
}

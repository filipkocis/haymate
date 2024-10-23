import Avatar from "@/components/Avatar"
import { LucideInfo } from "lucide-react"

export default function Settings() {
  return (
    <div className="animate-fade-in-page p-2 overflow-auto">
      <div className="flex flex-col gap-8 max-w-lg mx-auto">
        <div className="items-center flex flex-col gap-3">
          <div className="flex gap-2 border px-3 py-2 items-center text-red-500 border-red-500">
            <LucideInfo size={15} />
            <p className="text-sm">To change your settings, you can't be logged in as a guest</p>
          </div>
          <Avatar size={120} src="/SxAMojJiDmojqhTfUGxO4.png" />
        </div>

        <Field name="name" label="What's your name?" placeholder="Name" />
        <Field name="email" label="What's your email?" placeholder="Email" />
        <Field name="dob" label="What's your date of birth?" type="date" />
        <Field name="school" label="What school did you go to?" placeholder="School" />
        <Field name="work" label="Where do you work?" placeholder="Work" />
      </div>
    </div>
  )
}

function Field({ type = "text", name, label, placeholder }: { type?: string, name: string, label: string, placeholder?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label 
        className="text-lg font-semibold"
        htmlFor={name}
      >
        {label}
      </label>
      <input 
        className=""
        type={type}
        name={name} 
        placeholder={placeholder} 
      />
    </div>
  )
}

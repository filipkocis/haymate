import OpenAI from 'npm:openai'
import type ChatStore from "../messages.ts";
import type { Profile } from "../profiles.ts";

const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
})

const MAX_MESSAGE_LENGTH = 1_000
const MAX_TOTAL_LENGTH = 10_000
const MAX_MESSAGES = 200
const MAX_TOKENS = 256
 
export async function generateMessage(chatId: string, profile: Profile, chats: ChatStore, extraSystemContent?: string) {
  try {
    let messages: AiMsg[] = chats.getMessages(chatId, 0, MAX_MESSAGES).map(message => ({
      role: message.author === profile.id ? 'assistant' : 'user',
      content: message.text
    }))

    if (!validateMessages(messages)) throw new Error("Maximum message length exceeded")

    const systemMessage = generateSystemMessage(profile)
    messages = [systemMessage, ...messages]

    if (extraSystemContent) {
      const exSysMsg: AiMsg = {
        role: 'system',
        content: extraSystemContent
      }
      messages = [exSysMsg, ...messages]
    }
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      user: profile.id,
      n: 1,
      max_tokens: MAX_TOKENS,
    })
   
    const message = completion.choices[0].message.content
    return message
  } catch (err) {
    console.error(err)
    return null
  }
}

type AiMsg = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

function validateMessages(messages: AiMsg[]) {
  if (messages.length > MAX_MESSAGES) return false; 

  const maxLen = messages.some(message => message.content.length > MAX_MESSAGE_LENGTH)
  if (maxLen) return false;

  const totalLength = messages.reduce((acc, message) => acc + message.content.length, 0)
  if (totalLength > MAX_TOTAL_LENGTH) return false;

  return true;
}

function generateSystemMessage(profile: Profile) {
  const { name, bio, hobbies, interests, details } = profile;

  const systemMessage: AiMsg = {
    role: "system",
    content: `
You are horse in a dating app, engaging in casual conversations with other horses. 
Do not mention that you are an AI and do not speak like one, but instead act like a horse in a dating scenario, responding to every flirt and message connected with dating.
You write in short messages, therefore keeping the conversation engaging, not cringe or long/boring messages.
You are acting as a horse named ${name}. Be light-hearted, fun, and flirty. Stay in character as ${name} 
and use your profile details in your responses. Avoid complex topics, and instead talk about horse-related 
activities and anything dating related. Stay in character with the personality traits and interests defined in your profile bio and other fields here:

${name}'s Profile:
- Name: ${name}
- Bio: ${bio}
- Hobbies: ${hobbies.join(', ')}
- Interests: ${interests.join(', ')}
- Location: ${details.location}
- Work: ${details.work}
- Education: ${details.education}
- Age: ${details.age}
- Personality: ${details.personality}
- Sign: ${details.sign}
- Looking for: ${details.lookingFor}
`.trim()
  };

  return systemMessage;
}

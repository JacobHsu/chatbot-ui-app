
## chat

components/utility/global-state.tsx  


/app/[locale]/[workspaceid]/chat/page.tsx  

`<ChatSettings />`  

/components/models/model-select.tsx Hosted Local 選單

`const [tab, setTab] = useState<"hosted" | "local">("hosted")`

### message

#### useContext
components/utility/global-state.tsx
`ChatbotUIContext.Provider`

message-markdown-memoized npm [react-markdown](https://www.npmjs.com/package/react-markdown/v/8.0.6)

components/messages/message.tsx

```js
<MessageActions
    onCopy={handleCopy}
    onEdit={handleStartEdit}
    isAssistant={message.role === "assistant"}
```
Edit按鈕由 message.role 決定 非 assistant 顯示  

components/messages/message-actions.tsx

```js
{!isAssistant && isHovering && (
  <WithTooltip
    display={<div>Edit</div>}
```


### chat-settings

components/chat/chat-settings.tsx



```js
const fullModel = allModels.find(llm => llm.modelId === chatSettings.model)
{fullModel?.modelName} // 從 modelId 查到 modelName
```

lib/models/llm/openai-llm-list.ts
```js
const GPT4Turbo: LLM = {
  modelId: "gpt-4-turbo-preview",
  modelName: "GPT-4 Turbo",
```

lib/models/llm/llm-list.ts

```js
import { OPENAI_LLM_LIST } from "./openai-llm-list"
export const LLM_LIST_MAP: Record<string, LLM[]> = {
  openai: OPENAI_LLM_LIST,
```

lib/models/fetch-models.ts

```js
import { LLM_LIST_MAP } from "./llm/llm-list"
const models = LLM_LIST_MAP[provider]

modelsToAdd.push(...models)

return {
  hostedModels: modelsToAdd
}
```

app/[locale]/setup/page.tsx

```js
import { fetchHostedModels } from "@/lib/models/fetch-models"
  useEffect(() => {
     const data = await fetchHostedModels(profile)
```


app/[locale]/[workspaceid]/layout.tsx

```js
    const workspace = await getWorkspaceById(workspaceId)
    // default_model:"gpt-4-turbo-preview", embeddings_provider:"openai"

    setSelectedWorkspace(workspace)

    setChatSettings({
      model: (workspace?.default_model || "gpt-4-1106-preview") as LLMID,
      ...
      embeddingsProvider:
        (workspace?.embeddings_provider as "openai" | "local") || "openai"
    })
```


components/chat/chat-settings.tsx

```js
import { ChatSettingsForm } from "../ui/chat-settings-form"
<ChatSettingsForm
      chatSettings={defaultChatSettings as any}
```


## sidebar

/components/ui/dashboard.tsxdashboard
```js
import { SidebarSwitcher } from "@/components/sidebar/sidebar-switcher"
<Tabs
onValueChange={tabValue => {
    setContentType(tabValue as ContentType)
    // http://localhost:8888/zh/b670f680-a797-4266-845b-4f0527a61f86/chat?tab=tools
    router.replace(`${pathname}?tab=${tabValue}`)
}}
>
<SidebarSwitcher onContentTypeChange={setContentType} />
```

```js
const tabValue = searchParams.get("tab")

const [contentType, setContentType] = useState<ContentType>(
  tabValue as ContentType
)

<Sidebar contentType={contentType} showSidebar={showSidebar} />
```

/components/sidebar/sidebar.tsx

```js
import { SidebarContent } from "./sidebar-content"
const renderSidebarContent = (
  contentType: ContentType,
  data: any[],
  folders: Tables<"folders">[]
) => {
  return (
    <SidebarContent contentType={contentType} data={data} folders={folders} />
  )
}
   case "tools":
          return renderSidebarContent("tools", tools, toolFolders)
```

/components/sidebar/sidebar-content.tsx

```js
import { SidebarDataList } from "./sidebar-data-list"
      <SidebarDataList
        contentType={contentType}
        data={filteredData}
        folders={folders}
      />
```

/components/sidebar/sidebar-data-list.tsx

```js
import { ToolItem } from "./items/tools/tool-item"
case "tools":
  return <ToolItem key={item.id} tool={item as Tables<"tools">} />
```

app/[locale]/[workspaceid]/layout.tsx

```js
import { getToolWorkspacesByWorkspaceId } from "@/db/tools"

const toolData = await getToolWorkspacesByWorkspaceId(workspaceId)
setTools(toolData.tools)

```

/components/chat/chat-command-input.tsx

```js
import { ToolPicker } from "./tool-picker"
<ToolPicker />
```


sidebar-switcher 側邊欄按鈕  
sidebar renderSidebarContent 決定渲染的內容
sidebar-create-buttons 白色按鈕 New XXX 的功能  
sidebar-data-list sidebar/items/assistants 內容  


## supabase

https://supabase.com/dashboard/project/xxxx/settings/api

```bash
# Supabase Public
NEXT_PUBLIC_SUPABASE_URL= `Project URL>URL`
NEXT_PUBLIC_SUPABASE_ANON_KEY=`Project API Keys> public`

# Supabase Private
SUPABASE_SERVICE_ROLE_KEY=`Project API Keys>service_rolesecret`
```

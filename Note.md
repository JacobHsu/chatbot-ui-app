

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

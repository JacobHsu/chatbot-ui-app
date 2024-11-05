

## sidebar

/components/ui/dashboard.tsxdashboard
```js
<Tabs
onValueChange={tabValue => {
    setContentType(tabValue as ContentType)
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

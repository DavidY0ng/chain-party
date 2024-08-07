<script lang="ts">
    import Icon from '@iconify/svelte';
    import { Button } from '$lib/components/ui/button';
    import { locale, t } from '$lib/i18n';
    import { storeLocal, type TStoreLocal } from '$lib/stores/storeLocal';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
  
    let languages = [
      { name: 'English', code: 'en' },
      { name: '简体中文', code: 'zh' },
      { name: '繁體中文', code: 'zh-TW' },
      { name: '日本語', code: 'ja' },
      { name: 'Tiếng Việt', code: 'vi' },
      { name: 'Bahasa Melayu', code: 'my' },
      { name: 'ภาษาไทย', code: 'th' },
      { name: '한국어', code: 'ko' },
      { name: 'فارسی', code: 'per' }
    ];
  
    // Initialize selectedLanguage with the current locale
    $: selectedLanguage = $locale;
  
    const onChangeLanguage = (lang: string) => {
      selectedLanguage = lang;
      $locale = lang;
      storeLocal.update((items: any): TStoreLocal => {
        return {
          ...items,
          lang: lang
        };
      });
    };
  </script>
  
  <div class="pr-3">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button
          builders={[builder]}
          variant="outline"
          class="border-none bg-transparent hover:bg-transparent hover:text-purple-500"
        >
          <Icon icon="material-symbols:language" width="1.5em" height="1.5em" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content class="w-56 bg-[#251235] border-none">
        {#each languages as lang}
          <DropdownMenu.CheckboxItem 
            checked={selectedLanguage === lang.code}
            onCheckedChange={() => onChangeLanguage(lang.code)}
            class="hover:bg-[#3a1b50]"
          >
            {lang.name}
          </DropdownMenu.CheckboxItem>
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
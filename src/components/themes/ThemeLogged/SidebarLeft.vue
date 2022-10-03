<template>    
    <nav id="system_left_sidebar" class="sidebar d-print-none">
        <ul class="list-unstyled">
        <li class="system_task_link">
          <router-link to="/">
            <i class="bi bi-life-preserver"></i> {{labels.get('label_dashboard')}}
          </router-link>
          </li>
        <menu-tree v-for="(item, index) in globalVariables.user.tasks" :key="index" :menu="globalVariables.user.tasks[index]" :item_id_prefix="'side_menu_user_'"></menu-tree>

    </ul>
    </nav>        
    
</template>
<script setup>
    import globalVariables from "@/assets/globalVariables";
    import MenuTree from "@/components/MenuTree.vue";
    import labels from '@/labels' 
</script>
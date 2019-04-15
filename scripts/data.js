var data = {
    basic: [
        {
            name: 'button',
            title: 'Button',
            content:
                '<button class="btn btn-primary" @click="onClick">{{DemoButton}}</button>'
        },
        {
            name: 'icon',
            title: 'Icon',
            content: '<icon type="file" source="font-awesome" />'
        }
    ],
    form: [
        {
            name: 'form',
            title: 'Form',
            content:
                '<form :model="form" @submit.prevent="send()">\n</form>'
        },
        {
            name: 'text-input',
            title: 'Text',
            content: `<form-field
    input="text-input"
    v-model="form.email"
    name="email"
    label="Email"
    input-prepend="@"
    invalid-feedback="Wrong Email address!"
/>`
        }
    ],
    layout: [
        {
            name: 'tree',
            title: 'Tree',
            content: `<tree 
    :data="treeData" 
    search-placeholder="Search" 
    :plugins="[\'collapse\', \'search\']" 
    :search-comparator="comparatorsFunc[comparatorIndex]" 
/>`
        }
    ],
    ui: [
        {
            name: 'dashboad',
            title: 'Dashboard',
            content: `<dashboard
    :data="categories"
    defaultItemsColor="#cf213f"
    :start-expanded="false"
    :iconAttrs="{source: false}"
/>`
        }
    ]
};

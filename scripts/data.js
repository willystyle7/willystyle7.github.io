var data = {
    basic: [
        {
            name: 'new-line',
            title: 'New Line',
            content:
                '<br/>'
        },
        {
            name: 'hor-line',
            title: 'Horizontal Line',
            content:
                '<hr/>'
        },
        {
            name: 'button',
            title: 'Button',
            content:
                '<button class="btn btn-primary" @click="onClick">Button</button>'
        },
        {
            name: 'label',
            title: 'Label',
            content: '<label class="label">Label</label>'
        },
        {
            name: 'icon',
            title: 'Icon',
            content: '<i class="fas fa-file-prescription"></i>'
        }
    ],
    form: [
        {
            name: 'input-text',
            title: 'Text Input',
            content:
                '<input class= "form-control" type="text" placeholder="Enter data" name="iname">'
        },
        {
            name: 'textarea',
            title: 'Text Area',
            content: `<textarea class="form-control rounded-2" name="areaname" rows="7" cols="37" placeholder="Enter more data">Somewhere in the Galaxy, far far away...</textarea>`
        },
        {
            name: 'check-box',
            title: 'Check Box',
            content: `<div class="custom-control custom-checkbox">
    <input type="checkbox" class="custom-control-input" id="defaultChecked2" checked>
    <label class="custom-control-label" for="defaultChecked2">Default checked</label>
</div>`
        }
    ],
    layout: [
        {
            name: 'row',
            title: 'Row',
            content: `<div class="row">

</div>`
        },
        {
            name: 'col',
            title: 'Column',
            content: `<div class="col-md-4">

</div>`
        }
    ],
    ui: [
        {
            name: 'progress-bar',
            title: 'Progress Bar',
            content: `<div class="progress">
    <div class="progress-bar" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
</div>`
        }
    ]
};

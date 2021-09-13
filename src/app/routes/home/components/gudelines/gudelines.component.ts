import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gudelines',
  templateUrl: './gudelines.component.html',
  styleUrls: ['./gudelines.component.less'],
})
export class GudelinesComponent implements OnInit {
  constructor() {}

  tabs = [
    {
      title: 'Nomination',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus consectetur imperdiet. Phasellus ac quam elit. Morbi erat nisi, scelerisque eu pulvinar vitae, gravida vitae velit. Aliquam faucibus eros non viverra convallis. Vivamus eget accumsan purus.In rutrum viverra efficitur. Morbi sit amet tortor finibus, porta dolor a, tristique purus. Nam ut maximus nunc, consequat viverradui. Pellentesque et diam dolor. Mauris nec viverra ipsum. Cras id ultricies purus, in vestibulum enim. Mauris cursus consequat minec cursus. <br /><br />Curabitur velit enim, fringilla vel vehicula eget, pretium sit amet elit. Nunc lacinia, massa vitae lobortis accumsan, est erosvulputate ipsum, sed varius nulla massa eu leo. Ut eu rutrum orci. Aenean vitae sem mollis, commodo leo a, aliquet libero. Curabitursit amet accumsan lacus, eget eleifend diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nisl purus, tempus etdui a, placerat semper sem. Curabitur commodo, ex at maximus congue, risus nulla posuere elit, a porta ante ex id ante',
      image: './assets/gif/form.gif',
    },
    {
      title: 'Nomination Confirmation',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus consectetur imperdiet. Phasellus ac quam elit. Morbi erat nisi, scelerisque eu pulvinar vitae, gravida vitae velit. Aliquam faucibus eros non viverra convallis. Vivamus eget accumsan purus.In rutrum viverra efficitur. Morbi sit amet tortor finibus, porta dolor a, tristique purus. Nam ut maximus nunc, consequat viverradui. Pellentesque et diam dolor. Mauris nec viverra ipsum. Cras id ultricies purus, in vestibulum enim. Mauris cursus consequat minec cursus. <br /><br />Curabitur velit enim, fringilla vel vehicula eget, pretium sit amet elit. Nunc lacinia, massa vitae lobortis accumsan, est erosvulputate ipsum, sed varius nulla massa eu leo. Ut eu rutrum orci. Aenean vitae sem mollis, commodo leo a, aliquet libero. Curabitursit amet accumsan lacus, eget eleifend diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nisl purus, tempus etdui a, placerat semper sem. Curabitur commodo, ex at maximus congue, risus nulla posuere elit, a porta ante ex id ante',
      image: './assets/gif/confirmed.gif',
    },
    {
      title: 'Business & Video Upload',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus consectetur imperdiet. Phasellus ac quam elit. Morbi erat nisi, scelerisque eu pulvinar vitae, gravida vitae velit. Aliquam faucibus eros non viverra convallis. Vivamus eget accumsan purus.In rutrum viverra efficitur. Morbi sit amet tortor finibus, porta dolor a, tristique purus. Nam ut maximus nunc, consequat viverradui. Pellentesque et diam dolor. Mauris nec viverra ipsum. Cras id ultricies purus, in vestibulum enim. Mauris cursus consequat minec cursus. <br /><br />Curabitur velit enim, fringilla vel vehicula eget, pretium sit amet elit. Nunc lacinia, massa vitae lobortis accumsan, est erosvulputate ipsum, sed varius nulla massa eu leo. Ut eu rutrum orci. Aenean vitae sem mollis, commodo leo a, aliquet libero. Curabitursit amet accumsan lacus, eget eleifend diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nisl purus, tempus etdui a, placerat semper sem. Curabitur commodo, ex at maximus congue, risus nulla posuere elit, a porta ante ex id ante',
      image: './assets/gif/videoUpload.gif',
    },
    {
      title: 'Shortlist',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus consectetur imperdiet. Phasellus ac quam elit. Morbi erat nisi, scelerisque eu pulvinar vitae, gravida vitae velit. Aliquam faucibus eros non viverra convallis. Vivamus eget accumsan purus.In rutrum viverra efficitur. Morbi sit amet tortor finibus, porta dolor a, tristique purus. Nam ut maximus nunc, consequat viverradui. Pellentesque et diam dolor. Mauris nec viverra ipsum. Cras id ultricies purus, in vestibulum enim. Mauris cursus consequat minec cursus. <br /><br />Curabitur velit enim, fringilla vel vehicula eget, pretium sit amet elit. Nunc lacinia, massa vitae lobortis accumsan, est erosvulputate ipsum, sed varius nulla massa eu leo. Ut eu rutrum orci. Aenean vitae sem mollis, commodo leo a, aliquet libero. Curabitursit amet accumsan lacus, eget eleifend diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nisl purus, tempus etdui a, placerat semper sem. Curabitur commodo, ex at maximus congue, risus nulla posuere elit, a porta ante ex id ante',
      image: './assets/gif/select.gif',
    },
    {
      title: 'Voting',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus consectetur imperdiet. Phasellus ac quam elit. Morbi erat nisi, scelerisque eu pulvinar vitae, gravida vitae velit. Aliquam faucibus eros non viverra convallis. Vivamus eget accumsan purus.In rutrum viverra efficitur. Morbi sit amet tortor finibus, porta dolor a, tristique purus. Nam ut maximus nunc, consequat viverradui. Pellentesque et diam dolor. Mauris nec viverra ipsum. Cras id ultricies purus, in vestibulum enim. Mauris cursus consequat minec cursus. <br /><br />Curabitur velit enim, fringilla vel vehicula eget, pretium sit amet elit. Nunc lacinia, massa vitae lobortis accumsan, est erosvulputate ipsum, sed varius nulla massa eu leo. Ut eu rutrum orci. Aenean vitae sem mollis, commodo leo a, aliquet libero. Curabitursit amet accumsan lacus, eget eleifend diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nisl purus, tempus etdui a, placerat semper sem. Curabitur commodo, ex at maximus congue, risus nulla posuere elit, a porta ante ex id ante',
      image: './assets/gif/voting.gif',
    },
  ];

  ngOnInit(): void {}
}

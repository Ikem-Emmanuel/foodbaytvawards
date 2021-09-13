import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-judges',
  templateUrl: './judges.component.html',
  styleUrls: ['./judges.component.less'],
})
export class JudgesComponent implements OnInit {
  judges = [
    {
      title: 'Judge One | Proffessional Chef',
      description:
        'Vestibulum id magna metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras facilisis justo in auctor suscipit',
      avatar: './assets/avatar/judge1.png',
      socials: [
        { icon: 'facebook', link: 'https://www.facebook.com' },
        { icon: 'instagram', link: 'https://www.instagram.com' },
        { icon: 'linkedin', link: 'https://www.linkedin.com' },
      ],
    },
    {
      title: 'Judge Two | Proffessional Chef',
      description:
        'Vestibulum id magna metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras facilisis justo in auctor suscipit',
      avatar: './assets/avatar/judge1.png',
      socialTypes: ['facebookTemplate', 'instagramTemplate', 'linledinTemplate'],
      socials: [
        { icon: 'facebook', link: 'https://www.facebook.com' },
        { icon: 'instagram', link: 'https://www.instagram.com' },
        { icon: 'linkedin', link: 'https://www.linkedin.com' },
      ],
    },
    {
      title: 'Judge Three | Proffessional Chef',
      description:
        'Vestibulum id magna metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras facilisis justo in auctor suscipit',
      avatar: './assets/avatar/judge1.png',
      socialTypes: ['facebookTemplate', 'instagramTemplate', 'linledinTemplate'],
      socials: [
        { icon: 'facebook', link: 'https://www.facebook.com' },
        { icon: 'instagram', link: 'https://www.instagram.com' },
        { icon: 'linkedin', link: 'https://www.linkedin.com' },
      ],
    },
    {
      title: 'Judge Four | Proffessional Chef',
      description:
        'Vestibulum id magna metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras facilisis justo in auctor suscipit',
      avatar: './assets/avatar/judge1.png',
      socialTypes: ['facebookTemplate', 'instagramTemplate', 'linledinTemplate'],
      socials: [
        { icon: 'facebook', link: 'https://www.facebook.com' },
        { icon: 'instagram', link: 'https://www.instagram.com' },
        { icon: 'linkedin', link: 'https://www.linkedin.com' },
      ],
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}

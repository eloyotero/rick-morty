import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
})
export class TeamDetailComponent implements OnInit {
  memberId: number | null = null;

  ngOnInit(): void {
    this.memberId = Number(this.route.snapshot.paramMap.get('id'));
  }

  constructor(private route: ActivatedRoute) {}
}

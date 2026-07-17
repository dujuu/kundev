import { Component, input } from '@angular/core';
import type { TeamMember } from './team-member.model';

@Component({
  selector: 'app-team-member-card',
  imports: [],
  templateUrl: './team-member-card.html',
  styleUrl: './team-member-card.scss'
})
export class TeamMemberCard {
  member = input.required<TeamMember>();
}

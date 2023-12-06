"""added a new field for password in user model

Revision ID: d03ac593db9d
Revises: d5b3219d88b0
Create Date: 2023-12-06 23:57:53.845973

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd03ac593db9d'
down_revision = 'd5b3219d88b0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password_hash', sa.String(length=128), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('password_hash')

    # ### end Alembic commands ###
